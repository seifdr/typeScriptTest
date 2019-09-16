import { createNoSubstitutionTemplateLiteral } from "typescript";



class Modal {
    public overlayContainerID   = 'overlay';
    public overlayContainerGuts = 'overlayGuts'; 

    public isOpen = false;

    constructor(){
        // this.addOverlay();
    }
}

class itAlert {
    private baseEL: HTMLElement;
    private modal: Modal;
    private trigger:HTMLElement;    

    private hasAlerts:boolean;
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

    getAlerts(){
        fetch('https://feinberg-dev.fsm.northwestern.edu/it-new/ws/json-api.php?type=alerts').then(function(response) {
            return response.json();
        }).then(function( results ) {
            console.log( results );            
        });
    } 
}

window.onload=function() {

    let modal = new Modal();
    let alert = new itAlert( modal, 'homepageContent' );

};


// <div class="contain-1440 itAlert itDanger">
// <div class="contain-1120">
//   <!-- <i class="fa fa-exclamation-triangle fa-2x">&nbsp;</i> -->
//   <h3>System Alert</h3>
//   <p>Estibulum et mi at mauris mattis iaculis. Nulla lectus velit, pellentesque et ante sed, consequat luctus enim. Nulla elementum commodo lorem, eu fermentum velit posuere quis. Morbi ornare est at tellus volutpat maximus. Pellentesque sapien orci, accumsan non nisl et, placerat laoreet nunc. Nam cursus pulvinar viverra.</p>
//   <p><a id="alertTrigger" href="#">Read more</a></p>
// </div>
// </div>