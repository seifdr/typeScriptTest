// class Vehicle {
//     constructor( description, wheels ){
//         this.description = description;
//         this.wheels = wheels;
//     }
//     describeYourself(){
//         console.log(`I am a ${this.description} with ${this.wheels} wheels` );
//     }
// }  
// class semiTruck extends Vehicle {
//     constructor(){
//         //super refers back to the vehicle class, and then you can use the properties
//         super('semi truck', '18');
//     }
// }
// var truck = new Vehicle('Green Ford Explorer', 'Alumnium');
// var car = new Vehicle('Blue Toyota Camery', 'Steel');
// var meijerSemi = new semiTruck();
// meijerSemi.describeYourself();
// new lesson - getters and setters
//its possible in javascript to use getters and setters
// Getter - a getter is a method that gets the value of a specific property 
// Setter - a setter is a method that sets the value of a specific property
var attendence = {
    _list: [],
    set addName(name) {
        this._list.push(name);
    },
    get list() {
        return this._list.join(', ');
    }
};
attendence.addName = 'Duncan';
attendence.addName = 'Sneha';
attendence.addName = 'Rocky';
attendence.addName = 'Zahra';
attendence.addName = 'Kiaan';
console.log(attendence.list);
console.log('====================== Classes ======================');
var Hike = /** @class */ (function () {
    function Hike(distance, pace) {
        this.distance = distance;
        this.pace = pace;
    }
    Object.defineProperty(Hike.prototype, "lengthInHours", {
        get: function () {
            return this.calcLength() + " hours";
        },
        enumerable: true,
        configurable: true
    });
    Hike.prototype.calcLength = function () {
        return this.distance / this.pace;
    };
    return Hike;
}());
var mtTallac = new Hike(10, 2);
console.log(mtTallac.lengthInHours);
// The fetch function works natively in most browsers 
// the are alos node packages that work with fetch
// fetch function always takes in the url for the call
// fetch('http://api.open-notify.org/astros.json')
//     //turn response in json
//     .then( res => res.json() )
//     .then( console.log );
// fetch can also returned from functions, so if you want to create something more resusable you could
// const getPeopleInSpace = () => {
//     return fetch('http://api.open-notify.org/astros.json')
//         .then( res => res.json() );
// }
// getPeopleInSpace()
//     .then( console.log );
// const spaceNames = () => {
//     return getPeopleInSpace()
//         .then( json => json.people )
//         .then( people => people.map( p => p.name) )
//         .then( names => names.join(', ') );
// }
// spaceNames().then( console.log );
// const spacePeople = () => {
//     return new Promise( ( resolves, rejects) => {
//         const api = 'http://api.open-notify.org/astros.json';
//         const request = new XMLHttpRequest();
//         request.open('GET', api);
//         request.onload = () => {
//             if(request.status === 200){
//                 resolves(JSON.parse(request.response));
//             } else {
//                 rejects(Error(request.statusText));
//             }
//         }
//         // if there's an error well rejects and return that error
//         request.onerror = err => rejects(err);
//         // we have to send our request once weve created it
//         request.send();
//     });
// }
// spacePeople().then( 
//     spaceData => console.log( spaceData ),
//     err => console.error(
//         new Error('Cannot load space people!') 
//     )
//  );
// NEW STUFF HERE
// const delay = seconds => {
//     return new Promise(
//         resolve => setTimeout( resolve, seconds * 1000 ),
//     );
// }
// const countToFive = async () => {
//     console.log('zero seconds');
//     // await is a new keyword - its going to wait for the value of delay called with 1 second to be returned
//     // before executing any further.
//     await delay(1);
//     console.log('one second');
//     await delay(2);
//     console.log('two seconds');
//     await delay(3);
//     console.log('five seconds');
// } 
// countToFive();
//another video here, putting it all together
//example 1
// const gitHubRequest = async(loginName) => {
//     try {
//         var response        = await fetch(`https://api.github.com/users/${loginName}/followers`);
//         var json            = await response.json();
//         var followerList    = json.map( user => user.login );
//         console.log(followerList);
//     } catch(e) {
//         //e stands for error
//         console.log('Data didnt load', e );
//     }
// }
// gitHubRequest('eveporcello');
//example 
// (async(loginName) => {
//     try {
//         var response        = await fetch(`https://api.github.com/users/${loginName}/followers`);
//         var json            = await response.json();
//         var followerList    = json.map( user => user.login );
//         console.log(followerList);
//     } catch(e) {
//         //e stands for error
//         console.log('Data didnt load', e );
//     }
// })('eveporcello');
// gitHubRequest('eveporcello');
