var spacePeople = function () {
    return new Promise(function (resolves, rejects) {
        var api = 'http://api.open-notify.org/astros.json';
        var request = new XMLHttpRequest();
        request.open('GET', api);
        request.onload = function () {
            if (request.status === 200) {
                resolves(JSON.parse(request.response));
            }
            else {
                rejects(Error(request.statusText));
            }
        };
        // if there's an error well rejects and return that error
        request.onerror = function (err) { return rejects(err); };
        // we have to send our request once weve created it
        request.send();
    });
};
spacePeople().then(function (spaceData) { return console.log(spaceData); }, function (err) { return console.error(new Error('Cannot load space people!')); });
