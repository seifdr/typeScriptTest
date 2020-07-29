interface alert {
    showAlerts: string;
    color: string;
    blurb: string;
}

class itAlert {
    private baseEL: HTMLElement;
    private type:string;
    private hasAlerts: boolean;
    private alert: alert;

    constructor(){
        const alert = this.getAlert();
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

    addAlertBoxToPage (){
        const alertBox = this.buildBox( <alert>this.alert ); 
        this.baseEL.insertAdjacentHTML('afterbegin', alertBox ); 
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
            this.alert = <alert>results['fsmAlert'];

            //if toggle is not yes, dont show.
            if( this.alert.showAlerts == 'Yes' ){
                this.baseEL = document.getElementsByTagName('BODY')[0];
                this.addAlertBoxToPage();
            }

            return results['fsmAlert'];
        }
    } 
    
}

window.onload=function() {
    let alert = new itAlert(); 
};