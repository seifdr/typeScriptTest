
// var pmg = document.body.querySelector('g#Layer_1');
// var svg = document.getElementById('prevMedJewel');
interface product {
    id: number;
    title: string;
    element: [];
    type: string;
    categories: [];
    price: number;
    image: string;
    desc: string;
}

class Item implements product {
    id;
    title;
    element;
    type;
    categories;
    price:number;
    image: string;
    desc;

    constructor( item:product ){
        this.id = item.id;
        this.title = item.title;
        this.element = item.element;
        this.type = item.type;
        this.categories = item.categories;
        this.price = this.removeSpecialChars( item.price );
        this.image = item.image['path'];
        this.desc = item.desc;
    }

    outputOverlay(){
        // <img src="assets/png/300x200.png" />
        let output:string = `
            <div id="overlayPad">
                <div class="overlayImg">
                    <img src="http://feinberg-dev.fsm.northwestern.edu/it-new/${this.image}" />
                </div>
                <div class="overlayText">
                    <h3>${this.title}</h3>
                    <h6>$${ this.numberWithCommas( this.price ) }</h6>
                    <div>${this.desc}</div>
                    <br />
                    <a class="button" href="#">Add To Cart</a>
                </div>
            </div>
        `;
        return output;
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    removeSpecialChars( inputVal ){
        //allow periods
        return inputVal.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
    }
}

class Cart {
    private basket = [];
    private mappedBasket = [];

    public cartCount: number = 0;
    public cartTotal: number = 0;

    private modal: Modal;

    constructor( modal ) {
        this.modal = modal;
        this.makeCartInBrowser();
    }

    mapCart(){
        this.mappedBasket = this.basket.map( ( row:Item ) => {
            return row.id;
        });
    }

    addOrRemoveFromCart( item:product ){
        let positionInBasket:number;

        console.log( item );

        if( this.basket.length > 0 ){
    
            this.basket.forEach( (basketItem, i ) => {
                if ( basketItem.id === item.id ){
                    positionInBasket = i;
                }
            });

            console.log( positionInBasket );

            if( positionInBasket === -1 || positionInBasket === undefined ){
                let result = this.addToBasket(item);
                this.mapCart();
                this.updateCartTotalAndCount();
                return result;
            } else {
                // console.log("Already in cart. Remove");
                const deletedItem = this.removeFromBasket( positionInBasket )[0];
                
                let atcBtns = document.getElementsByClassName('atcBtn');

                for (let i = 0; i < atcBtns.length; i++) {
                    let dataId = atcBtns[i].getAttribute('data-id');

                    if( deletedItem['id'] == dataId ){
                        this.toggleATCbutton( atcBtns[i], false );
                    }
                }

                this.mapCart();
                this.updateCartTotalAndCount();
                return false;
            }

        } else {
            if( item.id != null || item.id != null ){
                let result = this.addToBasket(item);
                this.mapCart();
                this.updateCartTotalAndCount();
                return result;
            }
        }
    
    }

    addToBasket( item:product ){
        this.basket.push( item );
        console.log( "Basket: ", this.basket );
        return true;
    }

    removeFromBasket( positionInBasket ){
        console.log( 'Removing this: ', positionInBasket);
        return this.basket.splice(positionInBasket, 1);
    }

    inBasket( incomingID ){
        // let mappedArr = this.basket.map( ( x ) => {
        //     return x['id'];
        // });

        this.basket.forEach( (basketItem, i ) => {
            return ( basketItem.id === incomingID )? i : false;
        });
    }

    totalCart(){
        if( this.basket.length > 0 ){

            let cartTotal = 0;

            this.basket.forEach( (item) => {
                cartTotal += parseFloat( this.removeSpecialChars( item.price ) );
            });

            return cartTotal;
        }
    }

    countCart(){
        console.log( 'Cart count: ', this.cartCount );
        return this.basket.length;
    }

    updateCartTotalAndCount(){
        this.cartTotal = this.totalCart();
        this.cartCount = this.countCart();

        if( this.cartCount > 0 ){
            document.getElementById('cart').style.display = "block";

            let cartInfoTxt = '';

            console.log('Cart Count: ', this.cartCount );

            if( this.cartCount >=2 ){
                cartInfoTxt += `<p>${this.cartCount} items<br />`;
            } else {
                cartInfoTxt += `<p>${this.cartCount} item<br />`;
            }

            cartInfoTxt +=  `Total: $` + this.numberWithCommas( this.cartTotal ) + `</p>`; 

            document.getElementById('cartLeft').innerHTML = cartInfoTxt;
            document.getElementById('nav').style.top = "150px";
        } else {
            document.getElementById('cart').style.display = "none";
            document.getElementById('nav').style.top = "75px";
        }

    }

    setCookie(name, value, days){
        let d = new Date;
        d.setTime(d.getTime() + 24*60*60*1000*days);
        document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString();
    }

    getCookie(name) {
        let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }

    deleteCookie(name){
        this.setCookie(name, '', -1);
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

        document.getElementById('headerWrapper').insertAdjacentHTML('afterbegin', x);

        document.getElementById('viewCart').addEventListener( 'click', (e) => {
            let cartList = this.listCart();
            
            if( this.cartTotal > 0 ){
                this.modal.openOverlay( cartList );         
                this.wireUpCartDeletes();
            } else {
                this.modal.closeOverlay( document.getElementById(this.modal.overlayContainerGuts), document.getElementById(this.modal.overlayContainerID) );
            }
            
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
            this.modal.closeOverlay( document.getElementById(this.modal.overlayContainerGuts), document.getElementById(this.modal.overlayContainerID) );
        }
    }

    listCart(){
        this.cartCount = this.countCart();

        if( this.cartCount > 0 ){
            let cartlistOutput = '<div id="cartList">';

            this.basket.forEach( (row:Item, i) => {

                // <img src="http://feinberg-dev.fsm.northwestern.edu/it-new/images/placeholder/placeholder-140x140.png" />

                cartlistOutput += `<div class="cartRow">
                    <div class="crImg">
                        <img src="https://feinberg-dev.fsm.northwestern.edu/it-new/${row.image}" alt="${row.title}-image" />
                    </div>
                    <div class="crDesc">
                        <p>${row.title}</p>
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
                        <a href="#" class="button">Checkout Now</a> 
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
            elRef.textContent = "Remove From Cart";
        } else {
            elRef.classList.remove('onCart');
            elRef.textContent = "Add To Cart";
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

    removeSpecialChars( inputVal ){
        //allow periods
        return inputVal.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
    }
}

class Store {
    private apiURL = 'https://feinberg-dev.fsm.northwestern.edu/it-new/ws/purchasing-api.php';
    private containerEL:HTMLElement;
    private items = [<product>{}];
    private sortBy: string;
    private cart:Cart;
    private modal: Modal;

    constructor( containerID, cart, modal ) {
        this.modal = modal;
        this.cart = cart;
        this.containerEL = document.getElementById( containerID );
        this.stockTheShelves();
    }

    loadProducts() {
        return fetch( this.apiURL ).then( (response) => {
            //if you dont do another then, code executes before promise returns
            return response.json();
        }).then( (myJson) => {
            
            let result = myJson.items;

            if(result.length > 0){
                // this.items = myJson.items;

                myJson.items.forEach( (row:product, i) => {
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

            let shelves = `<div class="block-wrapper"><section class="shelves"><div class="feature-three-col modBreakFour">`;

            // <img src="assets/png/300x200.png" />
                this.items.forEach( ( item, i ) => {
                    shelves += `<article class="feature-box prodBox" data-id="${item.id}" data-num="${i}">   
                                    <center>
                                        <img src="https://feinberg-dev.fsm.northwestern.edu/it-new/${item.image}" alt="${item.title}-image" />
                                    </center>
                                    <div class="feature-copy">
                                        <h6>${item.title}</h6>
                                        <p>$${ this.numberWithCommas(item.price) }</p>
                                        <a class="specs" data-id="${item.id}" href="#">Read product specs</a>
                                    </div>
                                    <a class="button atcBtn" data-num="${i}" data-id="${item.id}" data-isCartBtn="true" href="#">Add To Cart</a>
                                </article>`;
                });

            shelves += `</div></section></div>`;

            this.containerEL.insertAdjacentHTML('beforeend', shelves);

            //add event listener to all product item feature boxes
            for( let el of document.getElementsByClassName('prodBox') ){
                el.addEventListener('click', (e) => {
                        let num = el.getAttribute('data-num');
                        let output = this.items[num].outputOverlay();

                        this.modal.openOverlay( output );
                        e.preventDefault();
                });
            }

            for( let elBtn of document.getElementsByClassName('atcBtn') ){
                elBtn.addEventListener('click', (e) => {
                    
                    let num = elBtn.getAttribute('data-num');
                    let cartResult = this.cart.addOrRemoveFromCart( this.items[num] );

                    if( cartResult ){
                        this.cart.toggleATCbutton( elBtn, true );
                    } else {
                        this.cart.toggleATCbutton( elBtn, false );
                    }

                    e.preventDefault();
                    e.stopPropagation();
                    
                });
            }    
        }
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    removeSpecialChars( inputVal ){
        //allow periods
        return inputVal.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
    }
}

class Modal {
    public overlayContainerID   = 'overlay';
    public overlayContainerGuts = 'overlayGuts'; 


    constructor(){
        this.addOverlay();
    }

    addOverlay() {
        let overlay = `<div id="overlay"><div id="overlay-content"><a href="#" class="closebtn"><i class="fa fa-times"> </i></a><div id="overlayGuts" class="col1of1 responsive-container"></div></div></div>`;
        
        document.getElementById('main-content').insertAdjacentHTML('beforeend', overlay);
    }

    updateOverlayContent( output ){
        let el = document.getElementById( this.overlayContainerGuts );
        el.innerHTML = output;
    }

    openOverlay( output ){
        let oel = document.getElementById( this.overlayContainerID );
        let el = document.getElementById( this.overlayContainerGuts );

        this.updateOverlayContent( output );

        oel.style.height = "100%";
        oel.style.display = "block";

        document.body.classList.add('modal-open');

        // Close modal when X btn is clicked
        oel.getElementsByClassName('closebtn')[0].addEventListener('click', (e) => {
            this.closeOverlay(el, oel);
        });

        // Close modal on ESC 
        document.addEventListener('keydown', (e) => {
            if(e.key === "Escape") {
                this.closeOverlay(el, oel);
            }
        });
    }

    closeOverlay(el, oel){
        el.innerHTML = "";
        oel.style.height = "0%";
        oel.style.display = "none";
        document.body.classList.remove('modal-open');
    }

}


window.onload=function() {
    let shoppingModal = new Modal();

    let shoppingCart = new Cart( shoppingModal );

    let store = new Store('shopping-cart', shoppingCart, shoppingModal );
};