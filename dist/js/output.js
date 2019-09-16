"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

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
    var overlay = "<div\xA0id=\"overlay\"><div\xA0id=\"overlay-content\"><a\xA0class=\"closebtn\"><i\xA0class=\"fa\xA0fa-times\">\xA0</i></a><div\xA0id=\"overlayGuts\"\xA0class=\"col1of1\xA0responsive-container\"></div></div></div>";

    if (document.getElementById('main-content')) {
      console.log('hello');
      document.getElementById('main-content').insertAdjacentHTML('beforeend', overlay);
    } else {
      console.log('goodbye');
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
    document.body.classList.add('modal-open'); // Close modal when X btn is clicked

    oel.getElementsByClassName('closebtn')[0].addEventListener('click', function (e) {
      _this.closeOverlay(el, oel, scrollPos);

      e.preventDefault();
    }); // Close modal on ESC 

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
  function itAlert(modal, baseEL) {
    this.hasAlerts = {
      'either': false,
      'homepageAlert': false,
      'purchasingAlert': false
    };
    this.modal = modal;
    this.getAlerts();

    if (!document.getElementById('homepageContent')) {
      //purchasing page
      this.baseEL = document.getElementById('main-content');
    } else {
      //hompage
      this.baseEL = document.getElementById('homepageContent');
    }
  }

  itAlert.prototype.addAlertBoxToPage = function () {
    var alertBox = "<div class=\"contain-1440 itAlert itDanger\">\n                            <div class=\"contain-1120\">\n                            <!-- <i class=\"fa fa-exclamation-triangle fa-2x\">&nbsp;</i> -->\n                            <h3>";
    alertBox += 'Hello';
    alertBox += "</h3>\n                            <p>Estibulum et mi at mauris mattis iaculis. Nulla lectus velit, pellentesque et ante sed, consequat luctus enim. Nulla elementum commodo lorem, eu fermentum velit posuere quis. Morbi ornare est at tellus volutpat maximus. Pellentesque sapien orci, accumsan non nisl et, placerat laoreet nunc. Nam cursus pulvinar viverra.</p>\n                            <p><a id=\"alertTrigger\" href=\"#\">Read more</a></p>\n                            </div>  \n                        </div>";
    this.baseEL.insertAdjacentHTML('afterbegin', alertBox);

    if (document.getElementById('alertTrigger')) {
      this.trigger = document.getElementById('alertTrigger');
      this.trigger.addEventListener('click', function (e) {
        console.log('Hello there!');
        e.preventDefault();
      });
    }
  };

  itAlert.prototype.getAlerts = function () {
    return __awaiter(this, void 0, void 0, function () {
      var results;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , fetch('https://feinberg-dev.fsm.northwestern.edu/it-new/ws/json-api.php?type=alerts').then(function (response) {
              return response.json();
            }).then(function (results) {
              return results;
            })];

          case 1:
            results = _a.sent();

            if (results['homepageAlert']) {
              this.hasAlerts.either = this.hasAlerts.homepageAlert = true;
            }

            if (results['purchasingAlert']) {
              this.hasAlerts.either = this.hasAlerts.purchasingAlert = true;
            }

            if (this.hasAlerts) {
              this.alerts = results;

              if (this.hasAlerts.either) {
                this.addAlertBoxToPage();
              }
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  return itAlert;
}();

window.onload = function () {
  var modal = new Modal();
  var alert = new itAlert(modal, 'homepageContent');
};