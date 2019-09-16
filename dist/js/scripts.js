
function removeSpecialChars( inputVal ){
    //allow periods
    return inputVal.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
}

// var pmg = document.body.querySelector('g#Layer_1');
// var svg = document.getElementById('prevMedJewel');
interface product {
    id: number;
    title: string;
    element: string;
    renewElement: string;
    type: string;
    categories;
    price: number;
    image: string;
    desc: string;
    onCart: boolean;
    renew: boolean;

    catStr: string
}

class Item implements product {
    id;
    title;
    element;
    renewElement;
    type;
    categories;
    price;
    image:string;
    desc;
    onCart;
    renew: boolean;

    catStr: string;

    constructor( item:product ){
        this.id = item.id;
        this.title = item.title;
        this.element = item.element;
        this.renewElement = item.renewElement;
        this.type = item.type;
        this.categories = item.categories;

        let tempPrice = removeSpecialChars( item.price );

        if( isNaN( tempPrice ) ){
            item.price = 0.00;
        } else {
            this.price = removeSpecialChars( tempPrice );
        }
        
        this.image = item.image['path'];
        this.desc = item.desc;

        this.onCart = ( item.onCart )? true : false; 
        
        this.renew = ( item.renew )? true : false;

        //output categories as a string
        if( this.categories ){
            try {
                this.catStr = this.categories.value.join(' ');
            } catch (error) {
                this.catStr = this.categories.value;
            }
        }
    }

    outputOverlay( num = null ){
        // <img src="assets/png/300x200.png" />
        const btnText = ( this.onCart )? 'Remove From Cart' : 'Add To Cart';
        const optClass = (this.onCart)? 'onCart':'';
 
        let output:string = `<div id="overlayPad" data-id="${this.id}" >
        <div class="bootstrap-wrapper">
    <div class="container">
    <div class="row">`;

                if( this.image != '/' ){   
                    output += `<div class="col-12 col-lg-6 overlayImg">
                        <div>
                            <img src="https://feinberg-dev.fsm.northwestern.edu/it-new/${this.image}" />
                        </div>
                    </div>`; 
                }     
        output += `<div class="col-12 col-lg-6 overlayText">
                        
                            <h3>${this.title}`;

                            if( this.catStr.includes('software') ){
                                if( this.renew ){
                                    output += ` - Renewing`;
                                }
                            }       
                            output += `</h3>
                        `;
                        

                    if( this.price != '0.00' ){
                        output += `<h6>$${ this.numberWithCommas( this.price ) }</h6>`;
                    }

                    if( typeof this.desc == "string" ){
                        output += `<div>${ this.desc }</div><br />`;
                    } else {
                        output += `<br />`;
                    }
                    
        
        if( this.price != '0.00' ){
            
            // COME BACK
            if( this.catStr.includes('software') ){
                output += `<div class="renewModalSelect">
                    <label>Purchase or Renew
                    Software Licence: </label>
                    <select class="renewModalInput" data-id="${this.id}" `;
            
                        if( this.onCart ){
                            output += ` disabled `;
                        }
                        
                    output += `>
                        <option value="new">New</option>
                        <option value="renew" `;

                        //come back here 3
                        if( this.renew ){
                            output += ` selected="selected" `;
                        }
                    output += `>Renew</option></select>`
                output += `</div>`;
            }

            output += `<a id="atcModalBtn" href="#" 
                            class="button ${optClass}" 
                            data-num="${num}" 
                            data-id="${this.id}"
                            data-catstr="${this.catStr}"    
                        >${ btnText }</a>`;
        }

        output += `</div>
            </div>
            </div>
            </div>
        </div>`;
        return output;
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

class Cart {
    private machformBase = 'https://forms.feinberg.northwestern.edu/view.php?id=48491';
    public basket = [];
    public mappedBasket = [];
    public softwareAltIds = [];

    public cartCount: number = 0;
    public cartTotal: number = 0;

    private modal: Modal;
    private cookie: Cookie;
    private softwareCookie: Cookie;

    //button text 
    public cartBtnTxt = {
        'Add'       : 'Add To Cart',
        'Remove'    : 'Remove From Cart',
        'Info'      : 'More Info'
    }

    constructor( modal, cookie, softwareCookie ) {
        this.modal = modal;
        this.cookie = cookie;
        this.softwareCookie = softwareCookie;
        this.makeCartInBrowser();
    }

    mapCart(){
        this.mappedBasket = this.basket.map( ( row:Item ) => {
            return row.id;
        });

        //map basket again to track software
        this.softwareAltIds = this.basket.map( ( row:Item ) => {
            if( row.renew ){
                return row.id;
            }
        });

        if( this.mappedBasket.length > 0 ){
            let mappedBasketToCookie = JSON.stringify( this.mappedBasket );
            this.cookie.setCookie( mappedBasketToCookie, 1 );

            if( this.softwareAltIds.length > 0 ){
                let softwareAltCookie = JSON.stringify( this.mappedBasket );
                this.softwareCookie.setCookie( softwareAltCookie, 1 );
            } else {
                this.softwareCookie.deleteCookie();
            }

        } else {
            this.cookie.deleteCookie();
            this.softwareCookie.deleteCookie();
        }
    }

    addOrRemoveFromCart( item:product ){
        let positionInBasket:number;

        if( this.basket.length > 0 ){
    
            this.basket.forEach( (basketItem, i ) => {
                if ( basketItem.id === item.id ){
                    positionInBasket = i; 
                }
            });

            if( positionInBasket === -1 || positionInBasket === undefined ){
                let result = this.addToBasket(item);

                //update the disable software select for software items only
                if( result ){
                    // this.disableSoftwareSelect(item);
                    this.toggleSoftwareSelects( item.id );
                }

                this.updateCartTotalAndCount();
                return result;
            } else {
                const deletedItem = this.removeFromBasket( positionInBasket )[0];
                
                let atcBtns = document.getElementsByClassName('atcBtn');

                for (let i = 0; i < atcBtns.length; i++) {
                    let dataId = atcBtns[i].getAttribute('data-id');

                    if( deletedItem['id'] == dataId ){
                        this.toggleATCbutton( atcBtns[i], false );
    
                        //this.unRenewSelect( dataId );
                        this.toggleSoftwareSelects(dataId);
                    }
                }
                this.updateCartTotalAndCount();
                return false;
            }

        } else {
            if( item.id != null || item.id != null ){
                let result = this.addToBasket(item);

                if( result ){
                    this.toggleSoftwareSelects( item.id );
                }

                this.updateCartTotalAndCount();
                return result;
            }
        }
    
    }

    //if item is within the basket then it disables the select box(es), if not, it enables the selects
    toggleSoftwareSelects( id ){
        if( id ){
            const selectDropDowns = document.querySelectorAll('select[data-id="'+ id +'"]');

            if( this.inBasket(id) != -1 ){
                selectDropDowns.forEach( selectEl => {
                    selectEl.setAttribute('disabled', 'disabled');
                });
            } else {
                selectDropDowns.forEach( selectEl => {
                    selectEl.removeAttribute('disabled');
                });
            }
        }
    }

    addToBasket( item:product ){
        this.basket.push( item );
        return true;
    }

    removeFromBasket( positionInBasket ){
        return this.basket.splice(positionInBasket, 1);
    }

    inBasket( incomingID ){
        let result = -1;
        
        this.basket.forEach( (basketItem, i ) => {
            if( basketItem.id === incomingID ){
                result = i; 
            }
        });

        return result;
    }

    totalCart(){
        if( this.basket.length > 0 ){

            let cartTotal = 0;

            this.basket.forEach( (item) => {
                cartTotal += parseFloat( removeSpecialChars( item.price ) );
            });

            return cartTotal;
        }
    }

    countCart(){
        return this.basket.length;
    }

    updateCartTotalAndCount(){
        this.mapCart();
        this.cartTotal = this.totalCart();
        this.cartCount = this.countCart();

        if( this.cartCount > 0 ){
            document.getElementById('cart').style.height = "75px";

            let cartInfoTxt = '';

            if( this.cartCount >=2 ){
                cartInfoTxt += `<p>${this.cartCount} items<br />`;
            } else {
                cartInfoTxt += `<p>${this.cartCount} item<br />`;
            }

            cartInfoTxt +=  `Total: $` + this.numberWithCommas( this.cartTotal ) + `</p>`; 

            document.getElementById('cartLeft').innerHTML = cartInfoTxt;
        } else {
            document.getElementById('cart').style.height = "0";
        }
    }

    makeCartInBrowser(){
        let x = `<div id="cart">
                    <div>
                        <div id="cartLeft"></div>
                        <div id="cartRight">
                            <a id="viewCart" class="button">View Cart</a>
                        </div>
                    </div>
                </div>`;

        // document.getElementById('headerWrapper').insertAdjacentHTML('afterbegin', x);

        document.body.insertAdjacentHTML('beforeend', x);

        //view cart button listener
        document.getElementById('viewCart').addEventListener( 'click', (e) => {
            let cartList = this.listCart();
            
            if( this.cartTotal > 0 ){
                this.modal.openOverlay( cartList );         
                this.wireUpCartDeletes();
                this.wireUpCartCheckoutBtn();
                e.preventDefault();
            } else {
                this.modal.closeOverlay( document.getElementById(this.modal.overlayContainerGuts), document.getElementById(this.modal.overlayContainerID), window.scrollY );
            }
        });
    }

    wireUpCartCheckoutBtn(){
        document.getElementById('checkoutNow').addEventListener( 'click', async (e) => {
            e.preventDefault();
            const checkoutURL = await this.makeCheckoutURL();
            //clear the cart
            this.basket = [];
            await this.mapCart();
            //clear the cookie
            await this.cookie.deleteCookie();

            //make sure cart feature at bottom of page is gone
            await this.updateCartTotalAndCount();

            //make sure all atcButtons are set back to purple/add to cart stage
            const allATCbtns = document.getElementsByClassName('atcBtn');
            
            for (let i = 0; i < allATCbtns.length; i++) { 
                allATCbtns[i].classList.remove('onCart');
            }
            
            if( this.modal.isOpen ){
                await this.modal.closeOverlay( document.getElementById(this.modal.overlayContainerGuts), document.getElementById(this.modal.overlayContainerID), window.scrollY );
            }

            e.target.href = checkoutURL;
            window.location = checkoutURL;
        });
    }

    wireUpCartDeletes(){
        if( this.countCart() > 0 ){
            let crDeleteBtns = document.getElementsByClassName('crDeleteBtn');
            let crDeleteEmbeds = document.getElementsByClassName('crDeleteEmbed');

            //delete links in column
            if( crDeleteBtns.length > 0 ){
                for( let el of crDeleteBtns ){
                    el.addEventListener('click', (e) => {
                        let positionInBasket = el.getAttribute('data-basket-position');
                        this.addOrRemoveFromCart( this.basket[positionInBasket] );
                        this.modal.updateOverlayContent( this.listCart() );
                        this.wireUpCartDeletes();
                        e.preventDefault();
                    });
                }
            }

            //delete links under title on responsive    
            if( crDeleteEmbeds.length > 0 ){
                for( let ela of crDeleteEmbeds ){
                    ela.addEventListener('click', (e) => {
                        let positionInBasket = ela.getAttribute('data-basket-position');
                        this.addOrRemoveFromCart( this.basket[positionInBasket] );
                        this.modal.updateOverlayContent( this.listCart() );
                        this.wireUpCartDeletes();
                        e.preventDefault();
                    });
                }
            }
        } else {
            this.modal.closeOverlay( document.getElementById(this.modal.overlayContainerGuts), document.getElementById(this.modal.overlayContainerID), window.scrollY );
        }
    }

    listCart(){
        this.cartCount = this.countCart();

        if( this.cartCount > 0 ){
            let cartlistOutput = '<div id="cartList">';

            this.basket.forEach( (row:Item, i) => {

                cartlistOutput += `<div class="cartRow">
                    <div class="crImg">`

                    if( row.image != '/' ){
                        cartlistOutput += `<img src="https://feinberg-dev.fsm.northwestern.edu/it-new/${row.image}" alt="${row.title}-image" />`;
                    }
        
                cartlistOutput += `</div>
                    <div class="crDesc">
                        <p>${row.title}`;
                            if( row.catStr.includes('software') ){
                                if( row.renew ){
                                    cartlistOutput += ` - Renewing`;
                                }
                            }       
                cartlistOutput += `</p>
                        <a class="crDeleteEmbed" data-basket-position="${ i }" >Delete</a>
                    </div>
                    <div class="crDelete"> 
                        <p><a class="crDeleteBtn" data-basket-position="${ i }" href="">Delete</a></p>
                    </div>
                    <div><p>$${ this.numberWithCommas(row.price, false) }</p></div>
                </div>`
            });

            cartlistOutput += `
                <div class="cartRow">
                    <div class="crImg">&nbsp;</div>
                    <div class="crDesc">&nbsp;</div>
                    <div class="crDelete">Total:</div>
                    <div>$${ this.numberWithCommas( this.totalCart(), true ) }</div>
                </div>
                <div class="cartRow">
                    <div class="checkoutRow">
                        <a id="checkoutNow" href="#" class="button">Checkout Now</a> 
                    </div>
                </div>
            `;

            cartlistOutput += '</div>';

            return cartlistOutput;
        }
        //list cart items for modal here.
    }

    toggleATCbutton( elRef, onCart:boolean ){
        if( onCart ){
            elRef.classList.add('onCart');
            elRef.textContent = this.cartBtnTxt.Remove;
        } else {
            elRef.classList.remove('onCart');
            elRef.textContent = this.cartBtnTxt.Add;
        }
        elRef.blur();
    }

    numberWithCommas(x, fixed = true) {
        if( fixed ){
            return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
        } else {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
        }
    }

    makeCheckoutURL(){
        if( this.basket.length > 0 ){
            let url = this.machformBase + '&'

            for (let i = 0; i < this.basket.length; i++) {
                
                if( this.basket[i].catStr.includes('software') ){
                    if(this.basket[i].renew ){
                        url += this.basket[i].renewElement + '=1';
                    } else {
                        url += this.basket[i].element + '=1';
                    }
                } else {
                    url += this.basket[i].element + '=1';
                }
               

                if( (i + 1) < this.basket.length ){
                    url += '&'
                }
            }
            return url;
        } else {
            return null;
        }
    }
}

class Store {
    private apiURL = 'https://feinberg-dev.fsm.northwestern.edu/it-new/ws/json-api.php';
    private containerEL:HTMLElement;
    private items = [<product>{}];
    private sortBy: string;
    private cart:Cart;
    private modal: Modal;
    private cookie: Cookie;
    private softwareCookie: Cookie;

    constructor( containerID, cart, modal, cookie, softwareCookie ) {
        this.modal = modal;
        this.cookie = cookie;
        this.softwareCookie = softwareCookie;
        this.cart = cart;
        this.containerEL = document.getElementById( containerID );
        this.stockTheShelves();
    }

    loadProducts() {
        const existingItemsInCookie = <number[]> this.cookie.getJSONfromCookieAsArray();
        const softwareRenewIds = this.softwareCookie.getJSONfromCookieAsArray();

        //place a spinner while it's loading products in the fetch
        const spinnerHTML = `
            <div id="spinnerContainer">
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <p>Loading products...</p>
                <span class="sr-only">Loading...</span>
            </div>
        `;

        this.containerEL.insertAdjacentHTML('beforeend', spinnerHTML);

        return fetch( this.apiURL ).then( (response) => {
            //hide the spinner 
            const spinner = document.getElementById('spinnerContainer');
            spinner.style.display = 'none';
            //if you dont do another then, code executes before promise returns
            return response.json();
        }).then( (myJson) => {
        
            let result = myJson.items;

            if(result.length > 0){
                // this.items = myJson.items;

                myJson.items.forEach( (row:product, i) => {

                    if( existingItemsInCookie.length > 0 ){
                        if( existingItemsInCookie.includes( row.id ) ){
                            row.onCart = true;

                            if( softwareRenewIds.includes( row.id ) ){
                                row.renew = true;
                            }

                            this.cart.addOrRemoveFromCart( new Item( row ) );
                        } else {
                            row.onCart = false;
                        }
                    }
                    this.items[i] = new Item( row );
                });

                return true;
            } else {
                return false;
            }
        });
    }

   async stockTheShelves(){

        let result = await this.loadProducts();

        if( result ){

            let shelves = `<div class="bootstrap-wrapper">
                            <div class="container-fluid">
                                <section id="filterChecks">
                                    <form class="row">
                                        <div class="col-6">
                                                <label>Filter by Category:</label>
                                                <select id="filterCat" class="filterOptions">
                                                    <option value="all">Show All</option>
                                                    <option value="bundles">Bundles</option>
                                                    <option value="desktops">Desktops</option>
                                                    <option value="laptops">Laptops</option>
                                                    <option value="monitors">Monitors</option>
                                                    <option value="ipads">iPads</option>
                                                    <option value="tablets">Tablets</option>
                                                    <option value="printers">Printers</option>
                                                    <option value="software">Software</option>
                                                    <option value="accessories">Peripheral Accessories</option>
                                                </select>
                                        </div>
                                        <div class="col-6">
                                            <label>Filter by OS:</label>
                                            <select id="filterOS" class="filterOptions">
                                                <option value="all">Show All</option>
                                                <option value="apple">Apple</option>
                                                <option value="pc">PC</option>
                                            </select>
                                        </div>   
                                    </form>
                                </section>
                                <section class="shelves"><div class="row">`;

            // <img src="assets/png/300x200.png" />
                this.items.forEach( ( item, i ) => {
                    let modPrice    = ( item.price == 0.00 )? '': '$' + this.numberWithCommas(item.price);
                    let modBtnTxt   = ( item.price == 0.00 )? this.cart.cartBtnTxt.Info : this.cart.cartBtnTxt.Add;   

                    shelves += `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 pbc" 
                            data-os="${item.type}" 
                            data-catString="${item.catStr}">
                        <article class="feature-box prodBox" 
                            data-id="${item.id}" 
                            data-num="${i}" 
                            data-catString="${item.catStr}">`;
                        
                        if( item.image != '/' ){
                            shelves += `<div class="img-container">
                                        <img class="img-fluid" src="https://feinberg-dev.fsm.northwestern.edu/it-new/${item.image}" alt="${item.title}-image" />
                                    </div>`;
                        }

                        shelves += `<div class="feature-copy">
                                        <div>
                                            <h6>${item.title}</h6>
                                            <p>${ modPrice }</p>
                                            <a class="specs" data-id="${item.id}">Read product specs</a>
                                        </div>`;

                                        if( item.catStr.includes('software') ){
                                            shelves += `<div class="renewSelect">
                                                        <label>Purchase or Renew
                                                        Software Licence: </label>
                                                        <select class="renewInput" data-id="${item.id}" `;
                                                        
                                                        if( item.onCart ){
                                                            shelves += ` disabled `;
                                                        }
                                                        
                                            shelves += `>
                                                            <option value="new">New</option>
                                                            <option value="renew" `;

                                                            //come back here 3
                                                            if( item.catStr.includes('software') ){
                                                                if( item.renew ){
                                                                    shelves += ` selected="selected" `;
                                                                }
                                                            }
                                            shelves += `>Renew</option></select></div>`;
                                        }
                    shelves +=      `</div>`;

                    shelves += `<a class="button atcBtn`;
                        if( item.onCart ){
                            shelves += ` onCart `
                            // come back here
                            modBtnTxt = this.cart.cartBtnTxt.Remove;
                        }
                    shelves +=  ` " data-num="${i}" data-id="${item.id}" data-isCartBtn="true" href="#">${modBtnTxt}</a></article></div>`;
                });

            shelves += `</div></section>
                            </div></div>`;
            this.containerEL.insertAdjacentHTML('beforeend', shelves);

            //add event listener to all product item feature boxes
            for( let el of document.getElementsByClassName('prodBox') ){
                el.addEventListener('click',(e) => {
                        e.preventDefault();
                        let num = el.getAttribute('data-num');
                        let output = this.items[num].outputOverlay(num);
                        this.modal.openOverlay( output );

                        let atcModalBtn = document.getElementById('atcModalBtn');

                        if( atcModalBtn != null ){
                            atcModalBtn.addEventListener('click', async (e) => {        
                                //Change the modal atc button 
                                await this.addToCartToggle(num, atcModalBtn);

                                //check if item is software, if so toggle the select disable attribute 
                                //depending on if its on the cart or not
                                if( this.items[num].catStr.includes('software') ){    
                                    // this.cart.toggleSoftwareSelects( this.items[num].id );
                                    this.cart.toggleSoftwareSelects( this.items[num]['id'] );          
                                }

                                //the cart toggle above only applies the modal add to cart button so...
                                //once it's been added to cart and the modal cart button has been toggled
                                //map the cart
                                this.cart.mapCart();

                            
                                //withe the cart mapped by id, we can check for it and update the prod box id appropiately
                                if( this.cart.mappedBasket.includes( this.items[num].id ) ){
                                    //the item is on the cart, change the prodbox btn to orange
                                    this.cart.toggleATCbutton( el.getElementsByClassName('atcBtn')[0], true );
                                } else {
                                    //the item is not on the cart, change the prodbox btn to purple
                                    this.cart.toggleATCbutton( el.getElementsByClassName('atcBtn')[0], false );
                                }
                            });
                        }
                        //wireup event listener to ATC button 
                });
            }

            //atc buttons on page (not modal)
            for( let elBtn of document.getElementsByClassName('atcBtn') ){
                elBtn.addEventListener('click', (e) => {

                    let num = elBtn.getAttribute('data-num');
                
                    if( this.items[num].price != '0.00' ){

                        //check if it's software
                        if( this.items[num].categories.value.includes('software') ){
                            //it is software, check selector value, and set the item.renew property
                            const selectInput = document.querySelector('article[data-id="'+ this.items[num].id +'"] select.renewInput' );
                            const selectVal = selectInput.options[selectInput.selectedIndex].value;
                            this.items[num].renew = ( selectVal == 'renew' )? true : false;
                        }

                        this.addToCartToggle(num, elBtn);
                        e.preventDefault();
                        e.stopPropagation();
                    } else {
                        let theeItem = <Item>this.items[num]; 
                        let output = theeItem.outputOverlay(num);
                        this.modal.openOverlay( output );
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            }   

            //add software select addEventListner, and stop event propagation 
            for( let elrenew of document.getElementsByClassName('renewInput') ){
                elrenew.addEventListener('click', (e) => {
                    let selectVal = elrenew.options[filterOS.selectedIndex].value;
                    e.preventDefault();
                    e.stopPropagation();
                });                
            }
            
            //filter dropdowns 
            const filterCat = document.getElementById('filterCat');
            const filterOS = document.getElementById('filterOS');

            filterCat.addEventListener( 'change', (e) => {
                this.filterShelves( filterCat, filterOS );
            });

            filterOS.addEventListener( 'change', (e) => {
                this.filterShelves( filterCat, filterOS );
            });
        }
    }

    addToCartToggle(num, elBtn){
        let cartResult = this.cart.addOrRemoveFromCart( this.items[num] );

        if( cartResult ){
            this.items[num].onCart = true;
            this.cart.toggleATCbutton( elBtn, true );
        } else {
            this.items[num].onCart = false;
            this.cart.toggleATCbutton( elBtn, false );
            //if its coming off the cart then you need to clear the renew selection too.
            this.items[num].renew  = false;
        }
    }

    filterShelves(filterCat, filterOS ){
        let products = document.getElementsByClassName('pbc');
        let selectedCat = filterCat.options[filterCat.selectedIndex].value;
        let selectedOS  = filterOS.options[filterOS.selectedIndex].value;

        this.showAllProducts(products);

        if( selectedCat != 'all'){
            // we have a filter
            this.hideShowProducts(products, selectedCat, selectedOS);
        } else if (selectedOS != 'all') {
            // we have a filter
            this.hideShowProducts(products, selectedCat, selectedOS);
        } else {
            //selected val is all, show everything
            this.showAllProducts(products);
        }
    }

    hideShowProducts( products, selectedCat, selectedOS ){
        for (let i = 0; i < products.length; i++) {
            const prod          = products[i];
            const prodTypeAttr  = prod.getAttribute('data-catString');
            const prodOSAttr    = prod.getAttribute('data-os');

            if( selectedCat != 'all' && !prodTypeAttr.includes( selectedCat ) ){
                prod.style.display = 'none';
            }

            if( selectedOS != 'all' && !prodOSAttr.includes( selectedOS ) ){
                prod.style.display = 'none';
            }
        }
    }

    showAllProducts(products){
        for (let i = 0; i < products.length; i++) {
            const prod          = products[i];
            prod.style.display = 'flex';
        }
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

class Modal {
    public overlayContainerID   = 'overlay';
    public overlayContainerGuts = 'overlayGuts'; 

    public isOpen = false;

    constructor(){
        this.addOverlay();
    }

    addOverlay() {
        let overlay = `<div id="overlay"><div id="overlay-content"><a class="closebtn"><i class="fa fa-times"> </i></a><div id="overlayGuts" class="col1of1 responsive-container"></div></div></div>`;
        
        document.getElementById('main-content').insertAdjacentHTML('beforeend', overlay);
    }

    updateOverlayContent( output ){
        let el = document.getElementById( this.overlayContainerGuts );
        el.innerHTML = output;
    }

    openOverlay( output ){

        const scrollPos = window.scrollY;
        window.scroll(0, scrollPos);

        let oel = document.getElementById( this.overlayContainerID );
        let el = document.getElementById( this.overlayContainerGuts );

        this.updateOverlayContent( output );

        oel.style.height = "100%";
        oel.style.display = "block";

        document.body.classList.add('modal-open');

        // Close modal when X btn is clicked
        oel.getElementsByClassName('closebtn')[0].addEventListener('click', (e) => {
            this.closeOverlay(el, oel, scrollPos);
            e.preventDefault();
        });

        // Close modal on ESC 
        document.addEventListener('keydown', (e) => {
            if(e.key === "Escape") {
                this.closeOverlay(el, oel, scrollPos);
                e.preventDefault();
            }
        });

        this.isOpen = true;

    }

    closeOverlay(el, oel, scrollPos){
        el.innerHTML = "";
        oel.style.height = "0%";
        oel.style.display = "none";
        document.body.classList.remove('modal-open');
        window.scroll(0, scrollPos);
        this.isOpen = false;
    }

}

class Cookie {
    name:string;

    constructor(name) {
        this.name = name;
    }

    setCookie(value, days){
        let d = new Date;
        d.setTime(d.getTime() + 24*60*60*1000*days);
        document.cookie = this.name + "=" + value + ";path=/;expires=" + d.toUTCString();
    }

    getCookie() {
        let v = document.cookie.match('(^|;) ?' + this.name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }

    getJSONfromCookieAsArray() {
        let existingItemsInCookie = <Array<number>> JSON.parse( this.getCookie() );

        return ( existingItemsInCookie )? existingItemsInCookie : [];
    }

    deleteCookie(){
        this.setCookie('', -1);
    }
}

window.onload=function() {
    const shoppingCookie = new Cookie( 'fsmITPurchasing' );
    const softwareCookie = new Cookie( 'fsmITPurchasingSoftware' );

    let shoppingModal = new Modal();

    let shoppingCart = new Cart( shoppingModal, shoppingCookie, softwareCookie );

    let store = new Store('shopping-cart', shoppingCart, shoppingModal, shoppingCookie, softwareCookie );

};