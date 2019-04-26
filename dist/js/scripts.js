
// var pmg = document.body.querySelector('g#Layer_1');
// var svg = document.getElementById('prevMedJewel');


window.onload=function() {
	// Get the Object by ID
	var a = document.getElementById("prevMedJewel");
	// Get the SVG document inside the Object tag
	var svgDoc = a.contentDocument;
    
    console.log( svgDoc ); 

    // Get one of the SVG items by ID;
	var svgItem = svgDoc.getElementById("Public_Health");
    // Set the colour to something else

    const allowedClicks = [
            { 
                'selector'      : 'Behavioral_Medicine',
                'icon_selector' : '#Behavioral_Medicine_Icon',
                'url'           : 'https://feinberg-dev.fsm.northwestern.edu/sites/prevmed/divisions/behavioral-medicine/index.html'    
            }, 
            {
                'selector'      : 'Epidemiology_1_',
                'icon_selector' : '#Epidemiology_Icon',
                'url'           : 'https://feinberg-dev.fsm.northwestern.edu/sites/prevmed/divisions/epidemiology/index.html'
            },
            {
                'selector'      : 'Nutrition',
                'icon_selector' : '#Nutrition_Icon',
                'url'           : 'https://feinberg-dev.fsm.northwestern.edu/sites/prevmed/divisions/nutrition/index.html'
            },
            {
                'selector'      : 'Behavioral_Intervention_Technology',
                'icon_selector' : '#Behavioral_Intervention_Technology_Icon',
                'url'           : '#'
            },
            {
                'selector'      : 'Biostatistics',
                'icon_selector' : '#Biostatistics_Icon',
                'url'           : 'https://feinberg-dev.fsm.northwestern.edu/sites/prevmed/divisions/biostatistics/index.html'
            },
            {
                'selector'      : 'Cancer_Epidemiology_and_Prevention',
                'icon_selector' : '#Cancer_Epidemiology_and_Prevention_Icon',
                'url'           : 'https://feinberg-dev.fsm.northwestern.edu/sites/prevmed/divisions/cancer-epidemiology-and-prevention/index.html'
            },
            {
                'selector'      : 'Health_and_Biomedical_Informatics',
                'icon_selector' : '#Health_and_Biomedical_Informatics_Icon',
                'url'           : 'https://feinberg-dev.fsm.northwestern.edu/sites/prevmed/divisions/health-and-biomedical-informatics/index.html'
            },
            {
                'selector'      : 'Public_Health',
                'icon_selector' : '#Public_Health_Icon',
                'url'           : 'https://feinberg-dev.fsm.northwestern.edu/sites/prevmed/divisions/public-health-practice/index.html'
            }
    ];

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
            });
            elem.addEventListener("mouseleave", e => {
                icon.style.opacity = .5;
            });
        } catch {
            //do nothing
        }
    });

};


