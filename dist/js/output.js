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
    var overlay = "<div id='overlay'><div id='overlay-content'><a class='closebtn'><i class='fa fa-times'></i></a><div id='overlayGuts' class='col1of1 responsive-container'></div></div></div>";
    document.getElementById('main-content').insertAdjacentHTML('beforeend', overlay);
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
  function itAlert(modal) {
    this.modal = modal;
    this.getAlert();
    this.baseEL = document.getElementsByTagName('BODY')[0];
  }

  itAlert.prototype.chooseColor = function (color) {
    if (color == "Red") {
      return ' redFsmAlert ';
    } else {
      if (color == "Blue") {
        return ' blueFsmAlert ';
      } else {
        return ' yellowFsmAlert ';
      }
    }
  };

  itAlert.prototype.buildBox = function (alert) {
    var alertBox = "<div class=\"contain-1440 fsmAlert " + this.chooseColor(alert.color) + "\">\n                    <div class=\"contain-1120\">\n                    <!-- <i class=\"fa fa-exclamation-triangle fa-2x\">&nbsp;</i>  -->\n                    <p>" + alert.blurb + "</p>";

    if (typeof alert.modal !== 'undefined') {
      alertBox += "<p><a id=\"alertTrigger\" href=\"#\">Read more</a></p>";
    }

    alertBox += "</div>  \n                </div>";
    console.log('inside:', alertBox);
    return alertBox;
  };

  itAlert.prototype.buildModalGuts = function (alert, type) {
    if (type === void 0) {
      type = 'v2';
    }

    if (type == 'v4') {
      return "<div class=\"bootstrap-wrapper\"> \n                        <div class=\"container\">\n                            <div class=\"row alertRow\">\n                                <div class=\"col-12\">" + alert.modal + "</div>\n                            </div>\n                        </div>\n                    </div>";
    } else {
      return "<div class=\"alert-wrapper\"> \n                        <div class=\"alert-container\">" + alert.modal + "</div>\n                    </div>";
    }
  };

  itAlert.prototype.addAlertBoxToPage = function () {
    var _modalClass = this.modal;
    var modalBox = '';
    var alertBox = this.buildBox(this.alerts['fsmAlert']);

    if (this.alerts['fsmAlert']['modal'] != '') {
      modalBox = this.buildModalGuts(this.alerts['fsmAlert']);
    }

    this.baseEL.insertAdjacentHTML('afterbegin', alertBox);

    if (modalBox != '') {
      if (document.getElementById('alertTrigger')) {
        this.trigger = document.getElementById('alertTrigger');
        this.trigger.addEventListener('click', function (e) {
          _modalClass.openOverlay(modalBox);

          e.preventDefault();
        });
      }
    }
  };

  itAlert.prototype.getAlert = function () {
    return __awaiter(this, void 0, void 0, function () {
      var results;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , fetch('https://www.feinberg.northwestern.edu/ws/alert-json-api.php').then(function (response) {
              return response.json();
            }).then(function (results) {
              return results;
            })];

          case 1:
            results = _a.sent();

            if (results['fsmAlert']) {
              this.hasAlerts = true;
              this.alerts = results;
              this.addAlertBoxToPage();
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
  var alert = new itAlert(modal);
};