var HOURHAND = document.querySelector("#hour");
var MINUTEHAND = document.querySelector("#minute");
var SECONDHAND = document.querySelector('#second');
function runTheClock() {
    //get date object 
    var date = new Date();
    //need to convert these into degrees
    var hr = date.getHours(); // 12 hours on a clock
    var min = date.getMinutes(); // 60 minutes on a clock
    var sec = date.getSeconds(); // 60 seconds
    console.log('hr: ' + hr + ' min: ' + min + ' sec: ' + sec);
    // these lets will contain the degrees we want to turn the arms
    var hrPosition = (hr * 360 / 12) + (min * (360 / 60) / 12);
    var minPosition = min * 360 / 60 + (sec * (360 / 60) / 60);
    var secPosition = sec * 360 / 60;
    //apply these numbers as degrees on the actual objects as inline styles
    HOURHAND.style.transform = "rotate(" + hrPosition + "deg)";
    MINUTEHAND.style.transform = "rotate(" + minPosition + "deg)";
    SECONDHAND.style.transform = "rotate(" + secPosition + "deg)";
}
var interval = setInterval(runTheClock, 1000);
