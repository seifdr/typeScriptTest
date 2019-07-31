const imgDir = 'assets/icons/';

let boxes = [];

window.addEventListener('load', () => {
    outputBoxes(); 
});

function getBoxData( url:string ){
    //get list
    return fetch( url ).then( (response) => {
    return response.json();
    }).then( (data) => {
    // console.log(data.results);
    return data.results; 
    }).catch( (error) => { 
    console.log('There was an error retreiving the data');
    //only return this if the fetch fails
    return [
        {
            title: 'Nearpod',
            image: 'nearpod.png',
            link: 'https://nearpod.com/login/'
        },
        {
            title: 'eMerg',
            image: '#',
            icon: '<i class="far fa-calendar-alt"></i>',
            link: 'https://ads-fed.northwestern.edu/adfs/ls/?wtrealm=https%3a%2f%2feMerg.fsm.northwestern.edu&wctx=WsFedOwinState%3dAyxRTRcnTF93PJSMAcU2eFMjtC726GNwGxVE_j5jaZVWx5Kj7fKGTyGn3pGMIyS6tmrbhBuJQd-Y-nNtBwBcKsQZg5lRFLwWKoPjtPl37RbE-nN0yUR6I60IHsScMH_1c38uU0JzpgzkPm1TVr7YgA&wa=wsignin1.0&wreply=https%3a%2f%2femerg.fsm.northwestern.edu%2f'
        },
        {
            title: 'NMH Web Paging',
            image: '#',
            icon: '<i class="fas fa-pager"></i>',
            link: 'https://nmpaging.nm.org/cgi-bin/cgiip.exe/WService=webmessaging/webmessaging.html'
        },
        {
            title: 'Path Presenter',
            image: 'path-presenter.png',
            link: 'https://www.pathpresenter.net/'
        },
        {
            title: 'Google',
            image: 'Google.png',
            link: 'https://www.google.com'
        },
        {
            title: 'NMH Access',
            image: 'nm.png',
            link: 'https://access.nmh.org'
        },
    ];
    });
}

async function outputBoxes(){
    //get json file
    boxes = await getBoxData('https://www.feinberg.northwestern.edu/md-education/assets/box-items.json');
    
    const mainBox = document.getElementById('mainBox');

    for (let i = 0; i < boxes.length; i++) {
    const row = boxes[i];

    let box = document.createElement('article');

    let boxCode = `<a href="${ row.link }"><div class="box">`;
    
    if( row.icon ){
        boxCode += row.icon;
    } else {
        boxCode += `<img src="${ imgDir + row.image }" alt="${ row.title + '-logo' }" />`;
    }

    boxCode += `</div><p>${ row.title }</p></a>`;

    box.innerHTML = boxCode;

    mainBox.appendChild(box);
    }
}