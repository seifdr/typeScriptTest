
// var pmg = document.body.querySelector('g#Layer_1');
// var svg = document.getElementById('prevMedJewel');
interface item {
    id: number;
    title: string;
    element: [];
    type: string;
    categories: [];
    price: number;
    desc: string;
}


class Store {
    private apiURL = 'https://feinberg-dev.fsm.northwestern.edu/it-new/ws/purchasing-api.php';
    private containerEL:HTMLElement;
    private items = [<item>{}];
    private sortBy: string;

    constructor( containerID ) {
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
                this.items = myJson.items;
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

                this.items.forEach( ( item ) => {
                    shelves += `<article class="feature-box">
                                    <center>
                                        <img src="assets/png/300x200.png" />
                                    </center>
                                    <div class="feature-copy">
                                        <h6>${item.title}</h6>
                                    </div>
                                    <a class="button" href="publications/index.html">Add To Cart</a>
                                </article>`;
                });

            shelves += `</div></section></div>`;

            console.log(shelves);

            this.containerEL.insertAdjacentHTML('beforeend', shelves);
        }
    }


}


window.onload=function() {
    let store = new Store('main-content');
};


// <section class="contain-1120"><div class="feature-three-col width-1120 policies"><article class="feature-box"><a href="information-security/index.html" title="Information Security"><div class="feature-copy"><div class="iBox"><i class="fas fa-shield-alt"></i></div><h4>Information Security</h4><p>Get details on information protection required by Feinberg</p></div></a></article>