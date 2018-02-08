var HOURHAND = document.querySelector("#hour");
var MINUTEHAND = document.querySelector("#minute");
var SECONDHAND = document.querySelector('#second');
// these lets will contain the degrees we want to turn the arms
var hrPosition = 20;
var minPosstion = 130;
var secPosition = 267;
//apply these numbers as degrees on the actual objects as inline styles
HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
