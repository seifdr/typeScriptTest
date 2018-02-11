
// The fetch function works natively in most browsers 
// the are alos node packages that work with fetch
// fetch function always takes in the url for the call
// fetch('http://api.open-notify.org/astros.json')
//     //turn response in json
//     .then( res => res.json() )
//     .then( console.log );

// fetch can also returned from functions, so if you want to create something more resusable you could
const getPeopleInSpace = () => {
    return fetch('http://api.open-notify.org/astros.json')
        .then( res => res.json() );
}

// const spaceNames = () => {
//     return getPeopleInSpace()
//         .then( json => json.people )
//         .then( people => people.map( p => p.name) )
//         .then( names => names.join(', ') );
// }

getPeopleInSpace()
    .then( console.log );

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