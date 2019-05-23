"use strict";

// var pmg = document.body.querySelector('g#Layer_1');
// var svg = document.getElementById('prevMedJewel');
window.onload = function () {
  makeSVGdynamic();
  window.addEventListener("resize", function (e) {
    makeSVGdynamic();
  });
};

function makeSVGdynamic() {
  // Get the Object by ID
  var a = document.getElementById("prevMedJewel"); // Get the SVG document inside the Object tag

  var svgDoc = a.contentDocument;
  console.log(svgDoc); // Get one of the SVG items by ID;

  var svgItem = svgDoc.getElementById("Public_Health"); // Set the colour to something else

  var baseURL = 'https://www.preventivemedicine.northwestern.edu';
  var allowedClicks = [{
    'selector': 'Behavioral_Medicine',
    'icon_selector': '#Behavioral_Medicine_Icon',
    'url': baseURL + '/divisions/behavioral-medicine/index.html'
  }, {
    'selector': 'Epidemiology',
    'icon_selector': '#Epidemiology_Icon',
    'url': baseURL + '/divisions/epidemiology/index.html'
  }, {
    'selector': 'Nutrition',
    'icon_selector': '#Nutrition_Icon',
    'url': baseURL + '/divisions/nutrition/index.html'
  }, {
    'selector': 'Biostatistics',
    'icon_selector': '#Biostatistics_Icon',
    'url': baseURL + '/divisions/biostatistics/index.html'
  }, {
    'selector': 'Cancer_Epidemiology_and_Prevention',
    'icon_selector': '#Cancer_Epidemiology_and_Prevention_Icon',
    'url': baseURL + '/divisions/cancer-epidemiology-and-prevention/index.html'
  }, {
    'selector': 'Health_and_Biomedical_Informatics',
    'icon_selector': '#Health_and_Biomedical_Informatics_Icon',
    'url': baseURL + '/divisions/health-and-biomedical-informatics/index.html'
  }, {
    'selector': 'Public_Health',
    'icon_selector': '#Public_Health_Icon',
    'url': baseURL + '/divisions/public-health-practice/index.html'
  }];
  allowedClicks.forEach(function (row) {
    try {
      //get a reference to jewel prong path
      var elem = svgDoc.getElementById(row.selector); //set prong cursor hover to pointer

      elem.style.cursor = 'pointer'; //setup click event

      elem.addEventListener("click", function (e) {
        return window.location.href = row.url;
      }); //grab a reference to the icon

      var icon_1 = svgDoc.querySelector(row.icon_selector); //set transition easing

      icon_1.style.transition = 'all .4s ease';
      icon_1.style['-webkit-transition'] = 'all .4s ease'; //change icon opacity one mouse enter and leave

      elem.addEventListener("mouseenter", function (e) {
        icon_1.style.opacity = 1;
      });
      elem.addEventListener("mouseleave", function (e) {
        icon_1.style.opacity = .5;
      });
    } catch (_a) {//do nothing 
    }
  });
}