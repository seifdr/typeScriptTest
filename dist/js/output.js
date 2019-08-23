"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
    var tempPrice = this.removeSpecialChars(item.price);

    if (isNaN(tempPrice)) {
      item.price = 0.00;
    } else {
      this.price = this.removeSpecialChars(tempPrice);
    }

    this.image = item.image['path'];
    this.desc = item.desc;
    this.onCart = item.onCart ? true : false;
  }

  Item.prototype.outputOverlay = function (num) {
    if (num === void 0) {
      num = null;
    } // <img src="assets/png/300x200.png" />


    var btnText = this.onCart ? 'Remove From Cart' : 'Add To Cart';
    var optClass = this.onCart ? 'onCart' : '';
    var output = "\n            <div id=\"overlayPad\">\n                <div class=\"overlayImg\">\n                    <img src=\"https://feinberg-dev.fsm.northwestern.edu/it-new/" + this.image + "\" />\n                </div>\n                <div class=\"overlayText\">\n                    <h3>" + this.title + "</h3>";

    if (this.price != '0.00') {
      output += "<h6>$" + this.numberWithCommas(this.price) + "</h6>";
    }

    output += "<div>" + this.desc + "</div><br />";

    if (this.price != '0.00') {
      output += "<a id=\"atcModalBtn\" class=\"button " + optClass + "\" href=\"#\" data-num=\"" + num + "\" >" + btnText + "</a>";
    }

    output += "</div>\n            </div>";
    return output;
  };

  Item.prototype.numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  Item.prototype.removeSpecialChars = function (inputVal) {
    //allow periods
    return inputVal.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
  };

  return Item;
}();

var Cart =
/** @class */
function () {
  function Cart(modal, cookie) {
    this.basket = [];
    this.mappedBasket = [];
    this.cartCount = 0;
    this.cartTotal = 0; //button text 

    this.cartBtnTxt = {
      'Add': 'Add To Cart',
      'Remove': 'Remove From Cart',
      'Info': 'More Info'
    };
    this.modal = modal;
    this.cookie = cookie;
    this.makeCartInBrowser();
  }

  Cart.prototype.mapCart = function () {
    this.mappedBasket = this.basket.map(function (row) {
      return row.id;
    });

    if (this.mappedBasket.length > 0) {
      var mappedBasketToCookie = JSON.stringify(this.mappedBasket);
      this.cookie.setCookie(mappedBasketToCookie, 1);
    } else {
      this.cookie.deleteCookie();
    }
  };

  Cart.prototype.addOrRemoveFromCart = function (item) {
    var positionInBasket;

    if (this.basket.length > 0) {
      this.basket.forEach(function (basketItem, i) {
        if (basketItem.id === item.id) {
          positionInBasket = i;
        }
      });
      console.log(positionInBasket);

      if (positionInBasket === -1 || positionInBasket === undefined) {
        var result = this.addToBasket(item);
        this.updateCartTotalAndCount();
        return result;
      } else {
        // console.log("Already in cart. Remove");
        var deletedItem = this.removeFromBasket(positionInBasket)[0];
        var atcBtns = document.getElementsByClassName('atcBtn');

        for (var i = 0; i < atcBtns.length; i++) {
          var dataId = atcBtns[i].getAttribute('data-id');

          if (deletedItem['id'] == dataId) {
            this.toggleATCbutton(atcBtns[i], false);
          }
        }

        this.updateCartTotalAndCount();
        return false;
      }
    } else {
      if (item.id != null || item.id != null) {
        var result = this.addToBasket(item);
        this.updateCartTotalAndCount();
        return result;
      }
    }
  };

  Cart.prototype.addToBasket = function (item) {
    this.basket.push(item);
    console.log("Basket: ", this.basket);
    return true;
  };

  Cart.prototype.removeFromBasket = function (positionInBasket) {
    console.log('Removing this: ', positionInBasket);
    return this.basket.splice(positionInBasket, 1);
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
    var _this = this;

    if (this.basket.length > 0) {
      var cartTotal_1 = 0;
      this.basket.forEach(function (item) {
        cartTotal_1 += parseFloat(_this.removeSpecialChars(item.price));
      });
      return cartTotal_1;
    }
  };

  Cart.prototype.countCart = function () {
    console.log('Cart count: ', this.cartCount);
    return this.basket.length;
  };

  Cart.prototype.updateCartTotalAndCount = function () {
    this.mapCart();
    this.cartTotal = this.totalCart();
    this.cartCount = this.countCart();

    if (this.cartCount > 0) {
      document.getElementById('cart').style.height = "75px";
      var cartInfoTxt = '';
      console.log('Cart Count: ', this.cartCount);

      if (this.cartCount >= 2) {
        cartInfoTxt += "<p>" + this.cartCount + " items<br />";
      } else {
        cartInfoTxt += "<p>" + this.cartCount + " item<br />";
      }

      cartInfoTxt += "Total: $" + this.numberWithCommas(this.cartTotal) + "</p>";
      document.getElementById('cartLeft').innerHTML = cartInfoTxt;
    } else {
      document.getElementById('cart').style.height = "0";
    }

    console.log(this.cookie.getJSONfromCookieAsArray());
  };

  Cart.prototype.makeCartInBrowser = function () {
    var _this = this;

    var x = "<div id=\"cart\">\n                    <div>\n                        <div id=\"cartLeft\"></div>\n                        <div id=\"cartRight\">\n                            <a id=\"viewCart\" class=\"button\">View Cart</a>\n                        </div>\n                    </div>\n                </div>"; // document.getElementById('headerWrapper').insertAdjacentHTML('afterbegin', x);

    document.body.insertAdjacentHTML('beforeend', x);
    document.getElementById('viewCart').addEventListener('click', function (e) {
      var cartList = _this.listCart();

      if (_this.cartTotal > 0) {
        _this.modal.openOverlay(cartList);

        _this.wireUpCartDeletes();

        e.preventDefault();
      } else {
        _this.modal.closeOverlay(document.getElementById(_this.modal.overlayContainerGuts), document.getElementById(_this.modal.overlayContainerID), window.scrollY);
      }
    });
  };

  Cart.prototype.wireUpCartDeletes = function () {
    var _this = this;

    if (this.countCart() > 0) {
      var crDeleteBtns = document.getElementsByClassName('crDeleteBtn');
      var crDeleteEmbeds = document.getElementsByClassName('crDeleteEmbed'); //delete links in column

      if (crDeleteBtns.length > 0) {
        var _loop_1 = function _loop_1(el) {
          el.addEventListener('click', function (e) {
            var positionInBasket = el.getAttribute('data-basket-position');

            _this.addOrRemoveFromCart(_this.basket[positionInBasket]);

            _this.modal.updateOverlayContent(_this.listCart());

            _this.wireUpCartDeletes();

            e.preventDefault();
          });
        };

        for (var _i = 0, crDeleteBtns_1 = crDeleteBtns; _i < crDeleteBtns_1.length; _i++) {
          var el = crDeleteBtns_1[_i];

          _loop_1(el);
        }
      } //delete links under title on responsive    


      if (crDeleteEmbeds.length > 0) {
        var _loop_2 = function _loop_2(ela) {
          ela.addEventListener('click', function (e) {
            var positionInBasket = ela.getAttribute('data-basket-position');

            _this.addOrRemoveFromCart(_this.basket[positionInBasket]);

            _this.modal.updateOverlayContent(_this.listCart());

            _this.wireUpCartDeletes();

            e.preventDefault();
          });
        };

        for (var _a = 0, crDeleteEmbeds_1 = crDeleteEmbeds; _a < crDeleteEmbeds_1.length; _a++) {
          var ela = crDeleteEmbeds_1[_a];

          _loop_2(ela);
        }
      }
    } else {
      this.modal.closeOverlay(document.getElementById(this.modal.overlayContainerGuts), document.getElementById(this.modal.overlayContainerID), window.scrollY);
    }
  };

  Cart.prototype.listCart = function () {
    var _this = this;

    this.cartCount = this.countCart();

    if (this.cartCount > 0) {
      var cartlistOutput_1 = '<div id="cartList">';
      this.basket.forEach(function (row, i) {
        // <img src="http://feinberg-dev.fsm.northwestern.edu/it-new/images/placeholder/placeholder-140x140.png" />
        cartlistOutput_1 += "<div class=\"cartRow\">\n                    <div class=\"crImg\">\n                        <img src=\"https://feinberg-dev.fsm.northwestern.edu/it-new/" + row.image + "\" alt=\"" + row.title + "-image\" />\n                    </div>\n                    <div class=\"crDesc\">\n                        <p>" + row.title + "</p>\n                        <a class=\"crDeleteEmbed\" data-basket-position=\"" + i + "\" >Delete</a>\n                    </div>\n                    <div class=\"crDelete\"> \n                        <p><a class=\"crDeleteBtn\" data-basket-position=\"" + i + "\" href=\"\">Delete</a></p>\n                    </div>\n                    <div><p>$" + _this.numberWithCommas(row.price, false) + "</p></div>\n                </div>";
      });
      cartlistOutput_1 += "\n                <div class=\"cartRow\">\n                    <div class=\"crImg\">&nbsp;</div>\n                    <div class=\"crDesc\">&nbsp;</div>\n                    <div class=\"crDelete\">Total:</div>\n                    <div>$" + this.numberWithCommas(this.totalCart(), true) + "</div>\n                </div>\n                <div class=\"cartRow\">\n                    <div class=\"checkoutRow\">\n                        <a href=\"#\" class=\"button\">Checkout Now</a> \n                    </div>\n                </div>\n            ";
      cartlistOutput_1 += '</div>';
      return cartlistOutput_1;
    } //list cart items for modal here.

  };

  Cart.prototype.toggleATCbutton = function (elRef, onCart) {
    if (onCart) {
      elRef.classList.add('onCart');
      elRef.textContent = this.cartBtnTxt.Remove;
    } else {
      elRef.classList.remove('onCart');
      elRef.textContent = this.cartBtnTxt.Add;
    }

    elRef.blur();
  };

  Cart.prototype.numberWithCommas = function (x, fixed) {
    if (fixed === void 0) {
      fixed = true;
    }

    if (fixed) {
      return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };

  Cart.prototype.removeSpecialChars = function (inputVal) {
    //allow periods
    return inputVal.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
  };

  return Cart;
}();

var Store =
/** @class */
function () {
  function Store(containerID, cart, modal, cookie) {
    this.apiURL = 'https://feinberg-dev.fsm.northwestern.edu/it-new/ws/purchasing-api.php';
    this.items = [{}];
    this.modal = modal;
    this.cookie = cookie;
    this.cart = cart;
    this.containerEL = document.getElementById(containerID);
    this.stockTheShelves();
  }

  Store.prototype.loadProducts = function () {
    var _this = this;

    var existingItemsInCookie = this.cookie.getJSONfromCookieAsArray();
    return fetch(this.apiURL).then(function (response) {
      //if you dont do another then, code executes before promise returns
      return response.json();
    }).then(function (myJson) {
      var result = myJson.items;

      if (result.length > 0) {
        // this.items = myJson.items;
        myJson.items.forEach(function (row, i) {
          if (existingItemsInCookie.length > 0) {
            if (existingItemsInCookie.includes(row.id)) {
              row.onCart = true;

              _this.cart.addOrRemoveFromCart(row);
            } else {
              row.onCart = false;
            }
          }

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
      var result, shelves_1, _loop_3, _i, _a, el, _loop_4, _b, _c, elBtn, filterCat_1, filterOS_1;

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
              shelves_1 = "<div class=\"bootstrap-wrapper\">\n                            <div class=\"container-fluid\">\n                                <section id=\"filterChecks\">\n                                    <form class=\"row\">\n                                        <div class=\"col-6\">\n                                                <label>Filter by Category:</label>\n                                                <select id=\"filterCat\" class=\"filterOptions\">\n                                                    <option value=\"all\">Show All</option>\n                                                    <option value=\"bundles\">Bundles</option>\n                                                    <option value=\"desktops\">Desktops</option>\n                                                    <option value=\"laptops\">Laptops</option>\n                                                    <option value=\"monitors\">Monitors</option>\n                                                    <option value=\"apple desktops\">Apple Desktops</option>\n                                                    <option value=\"apple laptops\">Apple Laptops</option>\n                                                    <option value=\"ipads\">iPads</option>\n                                                    <option value=\"tablets\">Tablets</option>\n                                                    <option value=\"printers\">Printers</option>\n                                                    <option value=\"software\">software</option>\n                                                </select>\n                                        </div>\n                                        <div class=\"col-6\">\n                                            <label>Filter by OS:</label>\n                                            <select id=\"filterOS\" class=\"filterOptions\">\n                                                <option value=\"all\">Show All</option>\n                                                <option value=\"apple\">Apple</option>\n                                                <option value=\"pc\">PC</option>\n                                            </select>\n                                        </div>   \n                                    </form>\n                                </section>\n                                <section class=\"shelves\"><div class=\"row\">"; // <img src="assets/png/300x200.png" />

              this.items.forEach(function (item, i) {
                var categoryStr = "";

                if (_typeof(item.categories['value']) == 'object') {
                  item.categories['value'].forEach(function (value) {
                    if (value) {
                      categoryStr = categoryStr + '' + value + ' ';
                    }
                  });
                } else {
                  categoryStr = item.categories['value'];
                }

                var modPrice = item.price == 0.00 ? '' : '$' + _this.numberWithCommas(item.price);
                var modBtnTxt = item.price == 0.00 ? _this.cart.cartBtnTxt.Info : _this.cart.cartBtnTxt.Add;
                shelves_1 += "<div class=\"col-xs-12 col-sm-6 col-md-4 col-lg-3 pbc\" data-os=\"" + item.type + "\" data-catString=\"" + categoryStr + "\"><article class=\"feature-box prodBox\" data-id=\"" + item.id + "\" data-num=\"" + i + "\" >   \n                                    <div class=\"img-container\">\n                                        <img class=\"img-fluid\" src=\"https://feinberg-dev.fsm.northwestern.edu/it-new/" + item.image + "\" alt=\"" + item.title + "-image\" />\n                                    </div>\n                                    <div class=\"feature-copy\">\n                                        <h6>" + item.title + "</h6>\n                                        <p>" + modPrice + "</p>\n                                        <a class=\"specs\" data-id=\"" + item.id + "\">Read product specs</a>\n                                    </div>";
                shelves_1 += "<a class=\"button atcBtn";

                if (item.onCart) {
                  shelves_1 += " onCart "; // come back here

                  modBtnTxt = _this.cart.cartBtnTxt.Remove;
                }

                shelves_1 += " \" data-num=\"" + i + "\" data-id=\"" + item.id + "\" data-isCartBtn=\"true\" href=\"#\">" + modBtnTxt + "</a></article></div>";
              });
              shelves_1 += "</div></section>\n                            </div></div>";
              this.containerEL.insertAdjacentHTML('beforeend', shelves_1);

              _loop_3 = function _loop_3(el) {
                el.addEventListener('click', function (e) {
                  e.preventDefault();
                  var num = el.getAttribute('data-num');

                  var output = _this.items[num].outputOverlay(num);

                  _this.modal.openOverlay(output);

                  var atcModalBtn = document.getElementById('atcModalBtn');
                  atcModalBtn.addEventListener('click', function (e) {
                    _this.addToCartToggle(num, atcModalBtn);
                  }); //wireup event listener to ATC button 
                });
              }; //add event listener to all product item feature boxes


              for (_i = 0, _a = document.getElementsByClassName('prodBox'); _i < _a.length; _i++) {
                el = _a[_i];

                _loop_3(el);
              }

              _loop_4 = function _loop_4(elBtn) {
                elBtn.addEventListener('click', function (e) {
                  var num = elBtn.getAttribute('data-num');

                  if (_this.items[num].price != '0.00') {
                    _this.addToCartToggle(num, elBtn);

                    e.preventDefault();
                    e.stopPropagation();
                  } else {
                    var output = _this.items[num].outputOverlay(num);

                    _this.modal.openOverlay(output);

                    e.preventDefault();
                    e.stopPropagation();
                  }
                });
              };

              for (_b = 0, _c = document.getElementsByClassName('atcBtn'); _b < _c.length; _b++) {
                elBtn = _c[_b];

                _loop_4(elBtn);
              }

              filterCat_1 = document.getElementById('filterCat');
              filterOS_1 = document.getElementById('filterOS');
              filterCat_1.addEventListener('change', function (e) {
                _this.filterShelves(filterCat_1, filterOS_1);
              });
              filterOS_1.addEventListener('change', function (e) {
                _this.filterShelves(filterCat_1, filterOS_1);
              });
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  Store.prototype.addToCartToggle = function (num, elBtn) {
    var cartResult = this.cart.addOrRemoveFromCart(this.items[num]);

    if (cartResult) {
      this.items[num].onCart = true;
      this.cart.toggleATCbutton(elBtn, true);
    } else {
      this.items[num].onCart = false;
      this.cart.toggleATCbutton(elBtn, false);
    }
  };

  Store.prototype.filterShelves = function (filterCat, filterOS) {
    var products = document.getElementsByClassName('pbc');
    var selectedCat = filterCat.options[filterCat.selectedIndex].value;
    var selectedOS = filterOS.options[filterOS.selectedIndex].value;
    console.log('Selected OS: ', selectedOS);
    this.showAllProducts(products);

    if (selectedCat != 'all') {
      // we have a filter
      this.hideShowProducts(products, selectedCat, selectedOS);
    } else if (selectedOS != 'all') {
      // we have a filter
      this.hideShowProducts(products, selectedCat, selectedOS);
    } else {
      //selected val is all, show everything
      this.showAllProducts(products);
    }
  };

  Store.prototype.hideShowProducts = function (products, selectedCat, selectedOS) {
    for (var i = 0; i < products.length; i++) {
      var prod = products[i];
      var prodTypeAttr = prod.getAttribute('data-catString');
      var prodOSAttr = prod.getAttribute('data-os');

      if (selectedCat != 'all' && !prodTypeAttr.includes(selectedCat)) {
        prod.style.display = 'none';
      }

      if (selectedOS != 'all' && !prodOSAttr.includes(selectedOS)) {
        prod.style.display = 'none';
      }
    }
  };

  Store.prototype.showAllProducts = function (products) {
    for (var i = 0; i < products.length; i++) {
      var prod = products[i];
      prod.style.display = 'flex';
    }
  };

  Store.prototype.numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  Store.prototype.removeSpecialChars = function (inputVal) {
    //allow periods
    return inputVal.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
  };

  return Store;
}();

var Modal =
/** @class */
function () {
  function Modal() {
    this.overlayContainerID = 'overlay';
    this.overlayContainerGuts = 'overlayGuts';
    this.addOverlay();
  }

  Modal.prototype.addOverlay = function () {
    var overlay = "<div id=\"overlay\"><div id=\"overlay-content\"><a class=\"closebtn\"><i class=\"fa fa-times\"> </i></a><div id=\"overlayGuts\" class=\"col1of1 responsive-container\"></div></div></div>";
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
  };

  Modal.prototype.closeOverlay = function (el, oel, scrollPos) {
    el.innerHTML = "";
    oel.style.height = "0%";
    oel.style.display = "none";
    document.body.classList.remove('modal-open');
    window.scroll(0, scrollPos);
  };

  return Modal;
}();

var Cookie =
/** @class */
function () {
  function Cookie(name) {
    this.name = name;
  }

  Cookie.prototype.setCookie = function (value, days) {
    var d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = this.name + "=" + value + ";path=/;expires=" + d.toUTCString();
  };

  Cookie.prototype.getCookie = function () {
    var v = document.cookie.match('(^|;) ?' + this.name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  };

  Cookie.prototype.getJSONfromCookieAsArray = function () {
    var existingItemsInCookie = JSON.parse(this.getCookie());
    return existingItemsInCookie ? existingItemsInCookie : [];
  };

  Cookie.prototype.deleteCookie = function () {
    this.setCookie('', -1);
  };

  return Cookie;
}();

window.onload = function () {
  var shoppingCookie = new Cookie('fsmITPurchasing');
  var shoppingModal = new Modal();
  var shoppingCart = new Cart(shoppingModal, shoppingCookie);
  var store = new Store('shopping-cart', shoppingCart, shoppingModal, shoppingCookie);
};