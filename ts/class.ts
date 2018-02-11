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
    set addName( name ){
        this._list.push(name);
    },
    get list(){
        return this._list.join(', ');
    }
}

attendence.addName = 'Duncan';
attendence.addName = 'Sneha';
attendence.addName = 'Rocky';
attendence.addName = 'Zahra';
attendence.addName = 'Kiaan';

console.log( attendence.list );



console.log('====================== Classes ======================');

class Hike {
    constructor( distance, pace ){
        this.distance   = distance;
        this.pace       = pace;       
    }

    get lengthInHours(){
        return `${this.calcLength()} hours`;
    }

    calcLength(){
        return this.distance / this.pace;
    }
}

const mtTallac = new Hike(10, 2);

console.log( mtTallac.lengthInHours );
