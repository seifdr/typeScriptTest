"use strict";

// var pmg = document.body.querySelector('g#Layer_1');
// var svg = document.getElementById('prevMedJewel');
window.onload = function () {
  fetch('https://feinberg-dev.fsm.northwestern.edu/it-new/ws/purchasing-api.php').then(function (response) {
    return response.json();
  }).then(function (myJson) {
    console.log(JSON.stringify(myJson));
  });
};