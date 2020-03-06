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
}

class itAlert {
    private baseEL: HTMLElement;
    private type:string;
    private trigger:HTMLElement;    

    private hasAlerts: boolean;

    private alerts: [];

    constructor(){
        if( this.getAlert() ){
            this.baseEL = document.getElementsByTagName('BODY')[0];
            // this.addAlertBoxToPage();
        }
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
            alertBox += `</div>  
                </div>`;
        return alertBox;
    }

    async getAlert(){

        let alertURL = 'https://www.feinberg.northwestern.edu/ws/alert-json-api.php';

        //if dev, overrride the alertURL
        if( window.location.href.indexOf('-dev') > 0 ){
            alertURL = 'https://feinberg-dev.fsm.northwestern.edu/ws/alert-json-api.php';
        }

        const results = await fetch( alertURL ).then(function(response) {
            return response.json();
        }).then( function( results ) {
            return results;     
        });

        if( results['fsmAlert'] ){
            this.hasAlerts = true;
            this.alerts = results;
            return true;
        } else {
            return false;
        }
    } 
    
}

window.onload=function() {
    let alert = new itAlert(); 
};