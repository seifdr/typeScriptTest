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

var Item =
/** @class */
function () {
  function Item(item) {
    this.id = item.id;
    this.title = item.title;
    this.element = item.element;
    this.type = item.type;
    this.categories = item.categories;
    this.price = item.price;
    this.desc = item.desc;
  }

  Item.prototype.outputOverlay = function () {
    var output = "\n            <div id=\"overlayPad\">\n                <div class=\"overlayImg\">\n                    <img src=\"assets/png/300x200.png\" />\n                </div>\n                <div class=\"overlayText\">\n                    <h3>" + this.title + "</h3>\n                    <h6>$" + this.numberWithCommas(this.price) + "</h6>\n                    <div>" + this.desc + "</div>\n                    <br />\n                    <a class=\"button\" href=\"#\">Add To Cart</a>\n                </div>\n            </div>\n        ";
    return output;
  };

  Item.prototype.numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return Item;
}();

var Cart =
/** @class */
function () {
  function Cart() {
    this.basket = [];
  }

  Cart.prototype.addOrRemoveFromCart = function (item) {
    console.log('Incoming item:', item);
    var mappedArr = [];
    var positionInBasket;

    if (this.basket.length > 0) {
      this.basket.forEach(function (basketItem, i) {
        if (basketItem.id === item.id) {
          positionInBasket = i;
        }
      });

      if (positionInBasket === -1 || positionInBasket === undefined) {
        return this.addToBasket(item);
      } else {
        console.log("Already in cart. Remove");
        var deletedItem = this.basket.splice(positionInBasket, 1);
        console.log(this.basket);
        return false;
      }
    } else {
      if (item.id != null || item.id != null) {
        return this.addToBasket(item);
      }
    }
  };

  Cart.prototype.addToBasket = function (item) {
    this.basket.push(item);
    console.log("Basket: ", this.basket);
    return true;
  };

  Cart.prototype.inBasket = function (incomingID) {
    // let mappedArr = this.basket.map( ( x ) => {
    //     return x['id'];
    // });
    this.basket.forEach(function (basketItem, i) {
      return basketItem.id === incomingID ? i : false;
    });
  };

  Cart.prototype.totalCart = function () {
    if (this.basket.length > 0) {
      var cartTotal_1 = 0;
      this.basket.forEach(function (item) {
        cartTotal_1 += item.price;
      });
      return cartTotal_1;
    }
  };

  Cart.prototype.countCart = function () {
    return this.basket.length;
  };

  Cart.prototype.setCookie = function (name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString();
  };

  Cart.prototype.getCookie = function (name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  };

  Cart.prototype.deleteCookie = function (name) {
    this.setCookie(name, '', -1);
  };

  return Cart;
}();

var Store =
/** @class */
function () {
  function Store(containerID, cart) {
    this.apiURL = 'https://feinberg-dev.fsm.northwestern.edu/it-new/ws/purchasing-api.php';
    this.items = [{}];
    this.cart = cart;
    this.containerEL = document.getElementById(containerID);
    this.stockTheShelves();
  }

  Store.prototype.loadProducts = function () {
    var _this = this;

    return fetch(this.apiURL).then(function (response) {
      //if you dont do another then, code executes before promise returns
      return response.json();
    }).then(function (myJson) {
      var result = myJson.items;

      if (result.length > 0) {
        // this.items = myJson.items;
        myJson.items.forEach(function (row, i) {
          _this.items[i] = new Item(row);
        });
        return true;
      } else {
        return false;
      }
    });
  };

  Store.prototype.stockTheShelves = function () {
    return __awaiter(this, void 0, void 0, function () {
      var result, shelves_1, _loop_1, _i, _a, el, _loop_2, _b, _c, elBtn;

      var _this = this;

      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            return [4
            /*yield*/
            , this.loadProducts()];

          case 1:
            result = _d.sent();

            if (result) {
              shelves_1 = "<div class=\"block-wrapper\"><section class=\"shelves\"><div class=\"feature-three-col modBreakFour\">";
              this.items.forEach(function (item, i) {
                shelves_1 += "<article class=\"feature-box prodBox\" data-id=\"" + item.id + "\" data-num=\"" + i + "\">   \n                                    <center>\n                                        <img src=\"assets/png/300x200.png\" />\n                                    </center>\n                                    <div class=\"feature-copy\">\n                                        <h6>" + item.title + "</h6>\n                                        <p>$" + _this.numberWithCommas(item.price) + "</p>\n                                        <a class=\"specs\" data-id=\"" + item.id + "\" href=\"#\">Read product specs</a>\n                                    </div>\n                                    <a class=\"button atcBtn\" data-num=\"" + i + "\" href=\"publications/index.html\">Add To Cart</a>\n                                </article>";
              });
              shelves_1 += "</div></section></div>";
              this.containerEL.insertAdjacentHTML('beforeend', shelves_1);

              _loop_1 = function _loop_1(el) {
                el.addEventListener('click', function (e) {
                  var num = el.getAttribute('data-num');

                  _this.openOverlay(num);

                  e.preventDefault();
                });
              }; //add event listener to all product item feature boxes


              for (_i = 0, _a = document.getElementsByClassName('prodBox'); _i < _a.length; _i++) {
                el = _a[_i];

                _loop_1(el);
              }

              _loop_2 = function _loop_2(elBtn) {
                elBtn.addEventListener('click', function (e) {
                  var num = elBtn.getAttribute('data-num');

                  var cartResult = _this.cart.addOrRemoveFromCart(_this.items[num]);

                  if (cartResult) {
                    elBtn.classList.add('onCart');
                    elBtn.textContent = 'Remove From Cart';
                  } else {
                    elBtn.classList.remove('onCart');
                    elBtn.textContent = 'Add to Cart';
                  }

                  e.preventDefault();
                  e.stopPropagation();
                });
              };

              for (_b = 0, _c = document.getElementsByClassName('atcBtn'); _b < _c.length; _b++) {
                elBtn = _c[_b];

                _loop_2(elBtn);
              }
            }

            this.addOverlay();
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Store.prototype.openOverlay = function (num) {
    var _this = this;

    var oel = document.getElementById('overlay');
    var el = document.getElementById('overlayGuts');
    var selectedItem = new Item(this.items[num]);
    el.innerHTML = selectedItem.outputOverlay();
    oel.style.height = "100%";
    oel.style.display = "block";
    document.body.classList.add('modal-open'); // Close modal when X btn is clicked

    oel.getElementsByClassName('closebtn')[0].addEventListener('click', function (e) {
      _this.closeOverlay(el, oel);
    }); // Close modal on ESC 

    document.addEventListener('keydown', function (e) {
      if (e.key === "Escape") {
        _this.closeOverlay(el, oel);
      }
    });
  };

  Store.prototype.closeOverlay = function (el, oel) {
    el.innerHTML = "";
    oel.style.height = "0%";
    oel.style.display = "none";
    document.body.classList.remove('modal-open');
  };

  Store.prototype.addOverlay = function () {
    var overlay = "<div id=\"overlay\"><div id=\"overlay-content\"><a href=\"#\" class=\"closebtn\"><i class=\"fa fa-times\"> </i></a><div id=\"overlayGuts\" class=\"col1of1 responsive-container\"></div></div></div>";
    this.containerEL.insertAdjacentHTML('beforeend', overlay);
  };

  Store.prototype.numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return Store;
}();

window.onload = function () {
  var cart = new Cart();
  console.log(cart.basket);
  var store = new Store('main-content', cart);
}; // <section class="contain-1120"><div class="feature-three-col width-1120 policies"><article class="feature-box"><a href="information-security/index.html" title="Information Security"><div class="feature-copy"><div class="iBox"><i class="fas fa-shield-alt"></i></div><h4>Information Security</h4><p>Get details on information protection required by Feinberg</p></div></a></article>