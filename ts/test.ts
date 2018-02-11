const spacePeople = () => {
    return new Promise( ( resolves, rejects) => {
        const api = 'http://api.open-notify.org/astros.json';
        const request = new XMLHttpRequest();
        request.open('GET', api);
        request.onload = () => {
            if(request.status === 200){
                resolves(JSON.parse(request.response));
            } else {
                rejects(Error(request.statusText));
            }
        }
        // if there's an error well rejects and return that error
        request.onerror = err => rejects(err);
        // we have to send our request once weve created it
        request.send();
    });
}

spacePeople().then( 
    spaceData => console.log( spaceData ),
    err => console.error(
        new Error('Cannot load space people!') 
    )
 );