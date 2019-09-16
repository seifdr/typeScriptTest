"use strict";

var Modal =
/** @class */
function () {
  function Modal() {
    this.overlayContainerID = 'overlay';
    this.overlayContainerGuts = 'overlayGuts';
    this.isOpen = false;
    this.addOverlay();
  }

  Modal.prototype.addOverlay = function () {
    var overlay = "<div id=\"overlay\"><div id=\"overlay-content\"><a class=\"closebtn\"><i class=\"fa fa-times\"> </i></a><div id=\"overlayGuts\" class=\"col1of1 responsive-container\"></div></div></div>";

    if (document.getElementById('main-content')) {
      document.getElementById('main-content').insertAdjacentHTML('beforeend', overlay);
    } else {
      document.getElementById('homepageContent').insertAdjacentHTML('beforeend', overlay);
    }
  };

  Modal.prototype.updateOverlayContent = function (output) {
    var el = document.getElementById(this.overlayContainerGuts);
    el.innerHTML = output;
  };

  Modal.prototype.openOverlay = function (output) {
    var _this = this;

    var scrollPos = window.scrollY;
    window.scroll(0, scrollPos);
    var oel = document.getElementById(this.overlayContainerID);
    var el = document.getElementById(this.overlayContainerGuts);
    this.updateOverlayContent(output);
    oel.style.height = "100%";
    oel.style.display = "block";
    document.body.classList.add('modal-open'); // Close modal when X btn is clicked

    oel.getElementsByClassName('closebtn')[0].addEventListener('click', function (e) {
      _this.closeOverlay(el, oel, scrollPos);

      e.preventDefault();
    }); // Close modal on ESC 

    document.addEventListener('keydown', function (e) {
      if (e.key === "Escape") {
        _this.closeOverlay(el, oel, scrollPos);

        e.preventDefault();
      }
    });
    this.isOpen = true;
  };

  Modal.prototype.closeOverlay = function (el, oel, scrollPos) {
    el.innerHTML = "";
    oel.style.height = "0%";
    oel.style.display = "none";
    document.body.classList.remove('modal-open');
    window.scroll(0, scrollPos);
    this.isOpen = false;
  };

  return Modal;
}();

var itAlert =
/** @class */
function () {
  function itAlert(baseEL, modal) {
    this.modal = modal;
    this.getAlerts();
    this.baseEL = document.getElementById(baseEL); // if( document.getElementById('alertTrigger') ){
    //     this.trigger = document.getElementById('alertTrigger');
    //     this.trigger.addEventListener('click', function( e ){
    //         console.log( 'Hello there!' );
    //         e.preventDefault();
    //     });
    // }
  }

  itAlert.prototype.getAlerts = function () {
    fetch('https://feinberg-dev.fsm.northwestern.edu/it-new/ws/json-api.php?type=alerts').then(function (response) {
      return response.json();
    }).then(function (results) {
      console.log(results['homepageAlert']); // this.results['homepage']

      this.alerts = results;
    });
  };

  return itAlert;
}();

window.onload = function () {
  var modal = new Modal();
  var alert = new itAlert(modal);
}; // <div class="contain-1440 itAlert itDanger">
// <div class="contain-1120">
//   <!-- <i class="fa fa-exclamation-triangle fa-2x">&nbsp;</i> -->
//   <h3>System Alert</h3>
//   <p>Estibulum et mi at mauris mattis iaculis. Nulla lectus velit, pellentesque et ante sed, consequat luctus enim. Nulla elementum commodo lorem, eu fermentum velit posuere quis. Morbi ornare est at tellus volutpat maximus. Pellentesque sapien orci, accumsan non nisl et, placerat laoreet nunc. Nam cursus pulvinar viverra.</p>
//   <p><a id="alertTrigger" href="#">Read more</a></p>
// </div>
// </div>