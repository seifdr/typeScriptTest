
// var pmg = document.body.querySelector('g#Layer_1');
// var svg = document.getElementById('prevMedJewel');
interface product {
    id: number;
    title: string;
    element: [];
    type: string;
    categories: [];
    price: number;
    desc: string;
}

class Item implements product {
    id;
    title;
    element;
    type;
    categories;
    price;
    desc;

    constructor( item:product ){
        this.id = item.id;
        this.title = item.title;
        this.element = item.element;
        this.type = item.type;
        this.categories = item.categories;
        this.price = item.price;
        this.desc = item.desc;
    }

    outputOverlay(){
        let output:string = `
            <div id="overlayPad">
                <div class="overlayImg">
                    <img src="assets/png/300x200.png" />
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
}

class Cart {
    private basket = [];

    constructor() {
        this.makeCartInBrowser();
    }

    addOrRemoveFromCart( item:product ){
        
        // console.log('Incoming item:', item );

        let mappedArr = [];
        let positionInBasket:number;

        if( this.basket.length > 0 ){
    
            this.basket.forEach( (basketItem, i ) => {
                if ( basketItem.id === item.id ){
                    positionInBasket = i;
                }
            });

            if( positionInBasket === -1 || positionInBasket === undefined ){
                return this.addToBasket(item);
            } else {
                // console.log("Already in cart. Remove");
                const deletedItem = this.basket.splice(positionInBasket, 1);
                // console.log( this.basket );
                return false;
            }

        } else {
            if( item.id != null || item.id != null ){
                return this.addToBasket(item);
            }
        }
    
    }

    addToBasket( item:product ){
        this.basket.push( item );
        // console.log( "Basket: ", this.basket );
        return true;
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
                cartTotal += item.price;
            });

            return cartTotal;
        }
    }

    countCart(){
        return this.basket.length;
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
        let x = `<div id="cartContainer">
                    <i class="fas fa-shopping-cart"></i>
                </div>`;

        document.body.insertAdjacentHTML('afterbegin', x);
        
    }
}

class Store {
    private apiURL = 'https://feinberg-dev.fsm.northwestern.edu/it-new/ws/purchasing-api.php';
    private containerEL:HTMLElement;
    private items = [<product>{}];
    private sortBy: string;
    private cart:Cart;

    constructor( containerID, cart ) {
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

                this.items.forEach( ( item, i ) => {
                    shelves += `<article class="feature-box prodBox" data-id="${item.id}" data-num="${i}">   
                                    <center>
                                        <img src="assets/png/300x200.png" />
                                    </center>
                                    <div class="feature-copy">
                                        <h6>${item.title}</h6>
                                        <p>$${ this.numberWithCommas(item.price) }</p>
                                        <a class="specs" data-id="${item.id}" href="#">Read product specs</a>
                                    </div>
                                    <a class="button atcBtn" data-num="${i}" data-isCartBtn="true" href="#">Add To Cart</a>
                                </article>`;
                });

            shelves += `</div></section></div>`;

            this.containerEL.insertAdjacentHTML('beforeend', shelves);

            //add event listener to all product item feature boxes
            for( let el of document.getElementsByClassName('prodBox') ){
                el.addEventListener('click', (e) => {
                        let num = el.getAttribute('data-num');
                        this.openOverlay( num );
                        e.preventDefault();
                });
            }

            for( let elBtn of document.getElementsByClassName('atcBtn') ){
                elBtn.addEventListener('click', (e) => {
                    
                    let num = elBtn.getAttribute('data-num');
                    let cartResult = this.cart.addOrRemoveFromCart( this.items[num] );

                    if( cartResult ){
                        elBtn.classList.add('onCart');
                        elBtn.textContent = 'Remove From Cart';
                        elBtn.blur();
                    } else {
                        elBtn.classList.remove('onCart');
                        elBtn.textContent = 'Add to Cart';
                        elBtn.blur();
                    }

                    e.preventDefault();
                    e.stopPropagation();
                    
                });
            }    
        }
        this.addOverlay();
    }
    openOverlay( num ){
        let oel = document.getElementById('overlay');
        let el = document.getElementById('overlayGuts');

        let selectedItem = new Item(this.items[num]);

        el.innerHTML = selectedItem.outputOverlay();

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

    addOverlay() {
        let overlay = `<div id="overlay"><div id="overlay-content"><a href="#" class="closebtn"><i class="fa fa-times"> </i></a><div id="overlayGuts" class="col1of1 responsive-container"></div></div></div>`;
        
        this.containerEL.insertAdjacentHTML('beforeend', overlay);
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

}


window.onload=function() {
    let cart = new Cart();

    // console.log( cart.basket )

    let store = new Store('shopping-cart', cart );
};


// <section class="contain-1120"><div class="feature-three-col width-1120 policies"><article class="feature-box"><a href="information-security/index.html" title="Information Security"><div class="feature-copy"><div class="iBox"><i class="fas fa-shield-alt"></i></div><h4>Information Security</h4><p>Get details on information protection required by Feinberg</p></div></a></article>