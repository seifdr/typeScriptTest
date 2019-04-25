"use strict";

// var pmg = document.body.querySelector('g#Layer_1');
// var svg = document.getElementById('prevMedJewel');
window.onload = function () {
  // Get the Object by ID
  var a = document.getElementById("prevMedJewel"); // Get the SVG document inside the Object tag

  var svgDoc = a.contentDocument;
  console.log(svgDoc); // Get one of the SVG items by ID;

  var svgItem = svgDoc.getElementById("Public_Health"); // Set the colour to something else

  var allowedClicks = [{
    'selector': 'Behavioral_Medicine',
    'url': 'https://www.google.com'
  }, {
    'selector': 'Epidemiology_1_',
    'url': 'https://www.bing.com'
  }, {
    'selector': 'Nutrition',
    'url': 'https://www.yahoo.com'
  }, {
    'selector': 'Behavioral_Intervention_Technology',
    'url': 'https://www.yahoo.com'
  }, {
    'selector': 'Biostatistics',
    'url': 'https://www.yahoo.com'
  }, {
    'selector': 'Cancer_Epidemiology_and_Prevention',
    'url': 'https://www.yahoo.com'
  }, {
    'selector': 'Health_and_Biomedical_Informatics',
    'url': 'https://www.yahoo.com'
  }, {
    'selector': 'Public_Health',
    'url': 'https://www.yahoo.com'
  }];
  allowedClicks.forEach(function (row) {
    try {
      var elem = svgDoc.getElementById(row.selector);
      elem.addEventListener("click", function (e) {
        return window.location.href = row.url;
      });
    } catch (_a) {//do nothing
    }
  }); // svgDoc.addEventListener( "click", (e) => {
  //     console.log( e.target );
  // }); 
  // for(let elem of svgDoc.querySelectorAll('g#icons')) {
  //     elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
  // };
  // svgItem.addEventListener('click', () => {
  //     alert("hello!"); 
  // }); 
  // console.log( svgItem ); 
  // svgItem.setAttribute("fill", "lime"); 
};