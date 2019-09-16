class Modal {
    public overlayContainerID   = 'overlay';
    public overlayContainerGuts = 'overlayGuts'; 

    public isOpen = false; 

    constructor(){
        this.addOverlay();
    }

    addOverlay() {
        let overlay = `<div id="overlay"><div id="overlay-content"><a class="closebtn"><i class="fa fa-times"> </i></a><div id="overlayGuts" class="col1of1 responsive-container"></div></div></div>`;
        
        if( document.getElementById('main-content') ){
            console.log('hello');
            document.getElementById('main-content').insertAdjacentHTML('beforeend', overlay);
        } else {
            console.log('goodbye');
            document.getElementById('homepageContent').insertAdjacentHTML('beforeend', overlay);
        }
    }

    updateOverlayContent( output ){
        let el = document.getElementById( this.overlayContainerGuts );
        el.innerHTML = output;
    }

    openOverlay( output ){

        const scrollPos = window.scrollY;
        window.scroll(0, scrollPos);

        let oel = document.getElementById( this.overlayContainerID );
        let el = document.getElementById( this.overlayContainerGuts );

        this.updateOverlayContent( output );

        oel.style.height = "100%";
        oel.style.display = "block";

        document.body.classList.add('modal-open');

        // Close modal when X btn is clicked
        oel.getElementsByClassName('closebtn')[0].addEventListener('click', (e) => {
            this.closeOverlay(el, oel, scrollPos);
            e.preventDefault();
        });

        // Close modal on ESC 
        document.addEventListener('keydown', (e) => {
            if(e.key === "Escape") {
                this.closeOverlay(el, oel, scrollPos);
                e.preventDefault();
            }
        });

        this.isOpen = true;

    }

    closeOverlay(el, oel, scrollPos){
        el.innerHTML = "";
        oel.style.height = "0%";
        oel.style.display = "none";
        document.body.classList.remove('modal-open');
        window.scroll(0, scrollPos);
        this.isOpen = false;
    }
        
}

class itAlert {
    private baseEL: HTMLElement;
    private modal: Modal;
    private trigger:HTMLElement;    

    private hasAlerts = {
        'either'            : false,
        'homepageAlert'     : false,
        'purchasingAlert'   : false
    };

    private alerts: [];

    constructor( modal, baseEL ){
        this.modal = modal;

        this.getAlerts(); 

        this.baseEL = document.getElementById( baseEL );


        
        // if( document.getElementById('alertTrigger') ){
        //     this.trigger = document.getElementById('alertTrigger');

        //     this.trigger.addEventListener('click', function( e ){
        //         console.log( 'Hello there!' );
        //         e.preventDefault();
        //     });
        // }
    }

    addAlertBoxToPage (){

        let alertBox = `<div class="contain-1440 itAlert itDanger">
                            <div class="contain-1120">
                            <!-- <i class="fa fa-exclamation-triangle fa-2x">&nbsp;</i> -->
                            <h3>`;
                            
                alertBox += 'Hello';        

                alertBox += `</h3>
                            <p>Estibulum et mi at mauris mattis iaculis. Nulla lectus velit, pellentesque et ante sed, consequat luctus enim. Nulla elementum commodo lorem, eu fermentum velit posuere quis. Morbi ornare est at tellus volutpat maximus. Pellentesque sapien orci, accumsan non nisl et, placerat laoreet nunc. Nam cursus pulvinar viverra.</p>
                            <p><a id="alertTrigger" href="#">Read more</a></p>
                            </div>  
                        </div>`

        this.baseEL.insertAdjacentHTML('afterbegin', alertBox ); 

    }

    async getAlerts(){
        const results = await fetch('https://feinberg-dev.fsm.northwestern.edu/it-new/ws/json-api.php?type=alerts').then(function(response) {
            return response.json();
        }).then( function( results ) {
            return results;     
        });

        if( results['homepageAlert'] ){
            this.hasAlerts.either = this.hasAlerts.homepageAlert = true;
        }
        
        if( results['purchasingAlert'] ){
            this.hasAlerts.either = this.hasAlerts.purchasingAlert = true;
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
    let alert = new itAlert( modal, 'homepageContent' ); 

};


