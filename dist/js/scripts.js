class Modal {
    public overlayContainerID   = 'overlay';
    public overlayContainerGuts = 'overlayGuts'; 

    public isOpen = false;

    constructor(){
        this.addOverlay(); 
    }

    addOverlay() {
        let overlay = `<div id='overlay'><div id='overlay-content'><a class='closebtn'><i class='fa fa-times'></i></a><div id='overlayGuts' class='col1of1 responsive-container'></div></div></div>`;
        
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

function removeSpecialChars( inputVal ){
    //allow periods
    return inputVal.toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
}

// var pmg = document.body.querySelector('g#Layer_1');
// var svg = document.getElementById('prevMedJewel');
interface product {
    position: number;
    id: number;
    title: string;
    element: string;
    renewElement: string;
    type: string;
    price: number;
    image: string;
    desc: string;
    onCart: boolean;
    renew: boolean;

    software: boolean;

    catStr: string
}

class Item implements product {
    position;
    id;
    title;
    element;
    renewElement;
    type;
    price;
    image:string;
    desc;
    onCart;
    renew: boolean;

    software:boolean;

    catStr: string;

    constructor( item:product ){
        this.position = item.position;
        this.id = item.id;
        this.title = item.title;
        this.element = item.element;
        this.renewElement = item.renewElement;
        this.type = item.type;
        this.software = item.software;

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
    }

    outputOverlay( position = null ){
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

                            if( this.software ){
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
            if( this.software ){
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
                            data-position="${position}" 
                            data-id="${this.id}"
                            data-is-software="{${this.software}}"   
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

            //get a reference to the ATC button from the items prodbox were dealing with
            let prodBoxAtcBtn = document.querySelector('article.prodBox[data-num="'+ item.id +'"] > a.atcBtn');

            if( positionInBasket === -1 || positionInBasket === undefined ){
                let result = this.addToBasket(item);

                // make sure the atcBTN on the prodBox is toggled on
                this.toggleATCbutton( prodBoxAtcBtn, true );
                
                //update the disable software select for software items only
                if( result ){
                    // this.disableSoftwareSelect(item);
                    this.toggleSoftwareSelects( item.id );
                }

                this.updateCartTotalAndCount();
                return result;
            } else {
                const deletedItem = this.removeFromBasket( positionInBasket )[0];
                
                // make sure the atcBTN on the prodBox is toggled off
                this.toggleATCbutton( prodBoxAtcBtn, false );

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
        let result:number = -1;

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
                        //finish me!
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
                            if( row.software ){
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
                
                if( this.basket[i].software ){
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
        // this.stockTheShelves();
        
        //load all the products that are present on the page
        this.loadProducts();
        
        // wire up the add to cart buttons
        this.wireUpAddToCartClicks();
    }

    loadProducts() {
        const existingItemsInCookie = <number[]> this.cookie.getJSONfromCookieAsArray();
        const softwareRenewIds = this.softwareCookie.getJSONfromCookieAsArray();

        console.log("ecIIC: ", existingItemsInCookie );

        let result = document.getElementsByClassName('prodBox');

        if(result.length > 0){
            // this.items = myJson.items;

            for (let i = 0; i < result.length; i++) {
                const prodBox = result[i];

                //add a position attr to prodBoxes. Makes it easier to find them by index val in this.items
                prodBox.setAttribute( 'data-position', i.toString() );
                prodBox.querySelector('a.atcBtn').setAttribute( 'data-position', i.toString() );
                
                //get the data-num property
                let dataNum = parseFloat( prodBox.getAttribute('data-num') );

                let row:product = {
                    id: dataNum,
                    title: prodBox.querySelector('div.feature-copy div > h6').innerHTML,
                    element: prodBox.getAttribute('data-element'),
                    renewElement: prodBox.getAttribute('data-renewElement'),
                    price: parseFloat( prodBox.getAttribute('data-price') ),
                    desc: prodBox.querySelector('div.feature-copy div.hiddenProdSpecs').innerHTML,
                    software: ( prodBox.getAttribute('data-is-software') === '1' ),
                    // element;
                    // renewElement;
                    // type;
                    // price;
                    // image:string;
                    // desc;
                    // onCart;
                    // renew: boolean;
                };

                if( prodBox.querySelector('div.img-container > img') ){
                    row.image = prodBox.querySelector('div.img-container > img').getAttribute('src');
                } else {
                    row.image = '';
                }

                if( existingItemsInCookie.length > 0 ){
                    
                    if( existingItemsInCookie.includes( row.id ) ){
                        row.onCart = true;

                        //if item is on cart already make sure to turn the btn orange and change the text
                        let onCartBtn = document.querySelector('article.prodBox[data-num="'+ row.id +'"] a.atcBtn');
                        this.cart.toggleATCbutton( onCartBtn, true );

                        if( softwareRenewIds.includes( row.id ) ){
                            row.renew = true;
                        }

                        this.cart.addOrRemoveFromCart( new Item( row ) );
                    } else {
                        row.onCart = false;
                    }
                }

                this.items[i] = new Item( row );
            }
    
            console.log( this.items );
        }
    }

    wireUpAddToCartClicks(){

        //add event listener to all product item feature boxes
        for( let el of document.getElementsByClassName('prodBox') ){
            el.addEventListener('click',(e) => {
                    e.preventDefault();
                    let num = el.getAttribute('data-num');
                    let position = el.getAttribute('data-position');
                    let isSoftware = ( el.getAttribute('data-is-software') == '1' ) ;

                    let output = this.items[position].outputOverlay(num);

                    this.modal.openOverlay( output );

                    let atcModalBtn = document.getElementById('atcModalBtn');

                    if( atcModalBtn != null ){
                        atcModalBtn.addEventListener('click', async (e) => {      
                            
                            //Change the modal atc button 
                            await this.addToCartToggle(position, atcModalBtn);

                            //check if item is software, if so toggle the select disable attribute 
                            //depending on if its on the cart or not
                            if( isSoftware ){    
                                // alert('Software here');
                                // this.cart.toggleSoftwareSelects( this.items[num].id );
                                this.cart.toggleSoftwareSelects( this.items[position]['id'] );          
                            } else {
                                // alert('Software not here');
                            }

                            //the cart toggle above only applies the modal add to cart button so...
                            //once it's been added to cart and the modal cart button has been toggled
                            //map the cart
                            this.cart.mapCart();

                            //withe the cart mapped by id, we can check for it and update the prod box id appropiately
                            if( this.cart.mappedBasket.includes( this.items[position].id ) ){
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
                let position = elBtn.getAttribute('data-position');
                let isSoftware = elBtn.getAttribute('data-is-software');
            
                if( this.items[position].price != '0.00' ){

                    //check if it's software
                    if( this.items[position].isSoftware ){
                        //it is software, check selector value, and set the item.renew property
                        const selectInput = document.querySelector('article[data-id="'+ this.items[position].id +'"] select.renewInput' );
                        const selectVal = selectInput.options[selectInput.selectedIndex].value;
                        this.items[position].renew = ( selectVal == 'renew' )? true : false;
                    }

                    this.addToCartToggle(position, elBtn);
                    e.preventDefault();
                    e.stopPropagation();
                } else {
                    let theeItem = <Item>this.items[position]; 
                    let output = theeItem.outputOverlay(position);
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

    }

    addToCartToggle(position, elBtn){
        let cartResult = this.cart.addOrRemoveFromCart( this.items[position] );

        if( cartResult ){
            this.items[position].onCart = true;
            this.cart.toggleATCbutton( elBtn, true );
        } else {
            this.items[position].onCart = false;
            this.cart.toggleATCbutton( elBtn, false );
            //if its coming off the cart then you need to clear the renew selection too.
            this.items[position].renew  = false;
        }
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

interface alert {
    title: string;
    color: string;
    blurb: string;
    modal?: string;
}

class itAlert {
    private baseEL: HTMLElement;
    private type:string;
    private modal: Modal;
    private trigger:HTMLElement;    

    private hasAlerts = {
        'either'            : false,
        'homepageAlert'     : false,
        'purchasingAlert'   : false
    };

    private alerts: [];

    constructor( modal, type ){
        this.modal = modal;

        this.getAlerts(); 

        if( type == 'purchasing' ){
            //purchasing page
            this.baseEL = document.getElementById( 'main-content' );
            this.type = 'purchasing';
        } else {
            //hompage
            this.baseEL = document.getElementById( 'homepageContent' );
            this.type = 'homepage';
        }        
    }

    chooseColor( color ){
        if( color == "Red"){
            return ' itDanger ';
        } else {
            return ' itPrimary ';
        }
    }

    buildBox( alert ){
        let alertBox = `<div class="contain-1440 itAlert ${ this.chooseColor( alert.color ) } ">
                    <div class="contain-1120">
                    <!-- <i class="fa fa-exclamation-triangle fa-2x">&nbsp;</i> -->
                    <h3>${alert.title}</h3>
                    <p>${alert.blurb}</p>`;

                    if( typeof alert.modal !== 'undefined' ){
                        alertBox += `<p><a id="alertTrigger" href="#">Read more</a></p>`;
                    }        
            alertBox += `</div>  
                </div>`;

            console.log('inside:', alertBox );
        return alertBox;
    }

    buildModalGuts( alert:alert ){

        return `<div class="bootstrap-wrapper"> 
                    <div class="container">
                        <div class="row alertRow">
                            <div class="col-12">${alert.modal}</div>
                        </div>
                    </div>
                </div>`;
    }

    addAlertBoxToPage (){
        const _modalClass = this.modal;
        let modalBox = '';

        if( this.type == 'homepage' ){
            const alertBox = this.buildBox( <alert>this.alerts['homepageAlert'] ); 

            if( this.alerts['homepageAlert']['modal'] != '' ){
                modalBox = this.buildModalGuts( <alert>this.alerts['homepageAlert'] );
            }

            this.baseEL.insertAdjacentHTML('afterbegin', alertBox ); 
        } else {

            console.log('Before: ', this.alerts['purchasingAlert']);

            const alertBox = this.buildBox( <alert>this.alerts['purchasingAlert'] ); 

            if( this.alerts['purchasingAlert']['modal'] != '' ){
                modalBox = this.buildModalGuts( <alert>this.alerts['purchasingAlert'] );
            }

            this.baseEL.querySelector('h1:first-of-type').insertAdjacentHTML('afterend', '<section>' + alertBox + '</section>' ); 

        }  

        if( modalBox != '' ){
            if( document.getElementById('alertTrigger') ){
                this.trigger = document.getElementById('alertTrigger');
    
                this.trigger.addEventListener('click', function( e ){
                    _modalClass.openOverlay( modalBox );
                    e.preventDefault(); 
                });
            }
        }

    }

    async getAlerts(){
        const results = await fetch('https://feinberg-dev.fsm.northwestern.edu/it-new/ws/json-api.php?type=alerts').then(function(response) {
            return response.json();
        }).then( function( results ) {
            return results;     
        });

        if( results['homepageAlert'] ){
            //homepage alert is set, but check that were on the homepage page
            if( this.type == 'homepage' ){
                this.hasAlerts.either = this.hasAlerts.homepageAlert = true;
            }
        }
        
        if( results['purchasingAlert'] ){
            //purchasing alert is set, but check that were on the purchasing page
            if( this.type == 'purchasing' ){
                this.hasAlerts.either = this.hasAlerts.purchasingAlert = true;
            }
        }

        if( this.hasAlerts ){
            this.alerts = results;

            if( this.hasAlerts.either ){
                this.addAlertBoxToPage();
            }
        }        
    } 
    
}

window.onload=function() {
    const shoppingCookie = new Cookie( 'fsmITPurchasing' );
    const softwareCookie = new Cookie( 'fsmITPurchasingSoftware' );

    let shoppingModal = new Modal();

    let shoppingCart = new Cart( shoppingModal, shoppingCookie, softwareCookie );

    let store = new Store('shopping-cart', shoppingCart, shoppingModal, shoppingCookie, softwareCookie );

    let alert = new itAlert( shoppingModal, 'purchasing' );
};


