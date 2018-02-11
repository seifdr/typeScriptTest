
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