const HOURHAND: any = document.querySelector("#hour");
const MINUTEHAND: any = document.querySelector("#minute");
const SECONDHAND: any = document.querySelector('#second');

// these lets will contain the degrees we want to turn the arms
let hrPosition  = 20;
let minPosstion = 130;
let secPosition = 267;

//apply these numbers as degrees on the actual objects as inline styles
HOURHAND.style.transform = "rotate("+ hrPosition + "deg)"; 