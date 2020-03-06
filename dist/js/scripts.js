class Modal {
    public overlayContainerID   = 'overlay';
    public overlayContainerGuts = 'overlayGuts'; 

    public isOpen = false;

    constructor(){
        this.addOverlay();
    }

    addOverlay() {
        let overlay = `<div id='overlay'><div id='overlay-content'><a class='closebtn'><i class='fa fa-times'></i></a><div id='overlayGuts' class='col1of1 responsive-container'></div></div></div>`;
        
        if( document.getElementById('main-content') ){
            //for fw
            document.getElementById('main-content').insertAdjacentHTML('beforeend', overlay);
        } else { 
            if( document.getElementById('mainContent') ){
                //for left-nav
                document.getElementById('mainContent').insertAdjacentHTML('beforeend', overlay);
            } else {
                //for rwd
                // document.getElementById('homepageContent').insertAdjacentHTML('beforeend', overlay);
            }
        } 
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

    private hasAlerts: boolean;

    private alerts: [];

    constructor( modal ){
        this.modal = modal;

        this.getAlert(); 

        this.baseEL = document.getElementsByTagName('BODY')[0];
  
    }

    chooseColor( color ){
        if( color == "Red"){
            return ' redFsmAlert ';
        } else {
            if( color == "Blue" ){
                return ' blueFsmAlert ';
            } else {
                return ' yellowFsmAlert ';
            }
        }
    }

    buildBox( alert ){
        let alertBox = `<div class="fsmAlert ${ this.chooseColor( alert.color ) }">
                    <div class="contain-1440">
                    <div class="alertMsg">${alert.blurb}</div>`;

                    if( typeof alert.modal !== 'undefined' ){
                        alertBox += `<p><a id="alertTrigger" href="#">Read more</a></p>`;
                    }        
            alertBox += `</div>  
                </div>`;

            console.log('inside:', alertBox );
        return alertBox;
    }

    buildModalGuts( alert:alert, type = 'v2' ){

        if( type == 'v4'){
            return `<div class="bootstrap-wrapper"> 
                        <div class="container">
                            <div class="row alertRow">
                                <div class="col-12">${alert.modal}</div>
                            </div>
                        </div>
                    </div>`;
        } else {
            return `<div class="alert-wrapper"> 
                        <div class="alert-container">${alert.modal}</div>
                    </div>`;
        }
    }

    addAlertBoxToPage (){
        const _modalClass = this.modal;
        let modalBox = '';

        const alertBox = this.buildBox( <alert>this.alerts['fsmAlert'] ); 

        if( this.alerts['fsmAlert']['modal'] != '' ){
            modalBox = this.buildModalGuts( <alert>this.alerts['fsmAlert'] );
        }

        this.baseEL.insertAdjacentHTML('afterbegin', alertBox ); 
        
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

    async getAlert(){
        const results = await fetch('https://www.feinberg.northwestern.edu/ws/alert-json-api.php').then(function(response) {
            return response.json();
        }).then( function( results ) {
            return results;     
        });

        if( results['fsmAlert'] ){
            this.hasAlerts = true;
            this.alerts = results;
            this.addAlertBoxToPage();
        }
    } 
    
}

window.onload=function() {

    let modal = new Modal();
    let alert = new itAlert( modal ); 

};


