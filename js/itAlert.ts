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

                    if( alert.modal != '' ){
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

    let modal = new Modal();
    let alert = new itAlert( modal, 'homepage' ); 

};


