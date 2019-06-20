
// var pmg = document.body.querySelector('g#Layer_1');
// var svg = document.getElementById('prevMedJewel');

window.onload=function() {

    makeSVGdynamic();

    window.addEventListener("resize", e => {
        makeSVGdynamic();
    });

};


function makeSVGdynamic() {
    // Get the Object by ID
	var a = document.getElementById("prevMedJewel");
	// Get the SVG document inside the Object tag
	var svgDoc = a.contentDocument;
    
    console.log( svgDoc ); 

    // // Get one of the SVG items by ID;
	// var svgItem = svgDoc.getElementById("Public_Health");
    // // Set the colour to something else

    const baseURL = 'https://www.preventivemedicine.northwestern.edu';

    const allowedClicks = [
            { 
                'selector'      : 'Behavioral_Medicine',
                'icon_selector' : '#Behavioral_Medicine_Icon',
                'url'           : baseURL + '/divisions/behavioral-medicine/index.html',
                'title'         : 'Behavior Medicine Division'     
            }, 
            {
                'selector'      : 'Epidemiology',
                'icon_selector' : '#Epidemiology_Icon',
                'url'           : baseURL + '/divisions/epidemiology/index.html',
                'title'         : 'Epidemiology Division' 
            },
            {
                'selector'      : 'Nutrition',
                'icon_selector' : '#Nutrition_Icon',
                'url'           : baseURL + '/divisions/nutrition/index.html',
                'title'         : 'Nutrition Division' 
            },
            {
                'selector'      : 'Biostatistics',
                'icon_selector' : '#Biostatistics_Icon', 
                'url'           : baseURL + '/divisions/biostatistics/index.html',
                'title'         : 'Biostatistics Division'
            },
            {
                'selector'      : 'Cancer_Epidemiology_and_Prevention',
                'icon_selector' : '#Cancer_Epidemiology_and_Prevention_Icon',
                'url'           : baseURL + '/divisions/cancer-epidemiology-and-prevention/index.html',
                'title'         : 'Cancer Epidemiology and Prevention Division'
            },
            {
                'selector'      : 'Health_and_Biomedical_Informatics',
                'icon_selector' : '#Health_and_Biomedical_Informatics_Icon',
                'url'           : baseURL + '/divisions/health-and-biomedical-informatics/index.html',
                'title'         : 'Health and Biomedical Informatics Division'
            },
            {
                'selector'      : 'Public_Health',
                'icon_selector' : '#Public_Health_Icon',
                'url'           : baseURL + '/divisions/public-health-practice/index.html',
                'title'         : 'Public Health Division'
            }
    ];

    //get a reference to SVG title
    let titleElem = svgDoc.getElementById("Layer_1").getElementsByTagName("title")[0];
    titleElem.innerHTML = 'Preventive Medicine Jewel';

    allowedClicks.forEach( row => {
        try {
            //get a reference to jewel prong path
            let elem = svgDoc.getElementById( row.selector );
            //set prong cursor hover to pointer
            elem.style.cursor = 'pointer';
            
            //setup click event
            elem.addEventListener("click", e => window.location.href = row.url );

            //grab a reference to the icon
            let icon = svgDoc.querySelector( row.icon_selector );
            //set transition easing
            icon.style.transition = 'all .4s ease';
            icon.style['-webkit-transition'] = 'all .4s ease';

            //change icon opacity one mouse enter and leave
            elem.addEventListener("mouseenter", e => {
                icon.style.opacity = 1;
                titleElem.innerHTML = row.title;
            });
            elem.addEventListener("mouseleave", e => {
                icon.style.opacity = .5;
                titleElem.innerHTML = '';
            });
        } catch {
            //do nothing 
        }
    });
}