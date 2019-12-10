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

function removeSpecialChars(inputVal) {
  //allow periods
  return inputVal.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
}

var Item =
/** @class */
function () {
  function Item(item) {
    this.id = item.id;
    this.title = item.title;
    this.element = item.element;
    this.renewElement = item.renewElement;
    this.type = item.type;
    this.software = false;
    var tempPrice = removeSpecialChars(item.price);

    if (isNaN(tempPrice)) {
      item.price = 0.00;
    } else {
      this.price = removeSpecialChars(tempPrice);
    }

    this.image = item.image['path'];
    this.desc = item.desc;
    this.onCart = item.onCart ? true : false;
    this.renew = item.renew ? true : false;
  }

  Item.prototype.outputOverlay = function (num) {
    if (num === void 0) {
      num = null;
    } // <img src="assets/png/300x200.png" />


    var btnText = this.onCart ? 'Remove From Cart' : 'Add To Cart';
    var optClass = this.onCart ? 'onCart' : '';
    var output = "<div id=\"overlayPad\" data-id=\"" + this.id + "\" >\n        <div class=\"bootstrap-wrapper\">\n    <div class=\"container\">\n    <div class=\"row\">";

    if (this.image != '/') {
      output += "<div class=\"col-12 col-lg-6 overlayImg\">\n                        <div>\n                            <img src=\"https://feinberg-dev.fsm.northwestern.edu/it-new/" + this.image + "\" />\n                        </div>\n                    </div>";
    }

    output += "<div class=\"col-12 col-lg-6 overlayText\">\n                        \n                            <h3>" + this.title;

    if (this.catStr.includes('software')) {
      if (this.renew) {
        output += " - Renewing";
      }
    }

    output += "</h3>\n                        ";

    if (this.price != '0.00') {
      output += "<h6>$" + this.numberWithCommas(this.price) + "</h6>";
    }

    if (typeof this.desc == "string") {
      output += "<div>" + this.desc + "</div><br />";
    } else {
      output += "<br />";
    }

    if (this.price != '0.00') {
      // COME BACK
      if (this.catStr.includes('software')) {
        output += "<div class=\"renewModalSelect\">\n                    <label>Purchase or Renew\n                    Software Licence: </label>\n                    <select class=\"renewModalInput\" data-id=\"" + this.id + "\" ";

        if (this.onCart) {
          output += " disabled ";
        }

        output += ">\n                        <option value=\"new\">New</option>\n                        <option value=\"renew\" "; //come back here 3

        if (this.renew) {
          output += " selected=\"selected\" ";
        }

        output += ">Renew</option></select>";
        output += "</div>";
      }

      output += "<a id=\"atcModalBtn\" href=\"#\" \n                            class=\"button " + optClass + "\" \n                            data-num=\"" + num + "\" \n                            data-id=\"" + this.id + "\"\n                            data-catstr=\"" + this.catStr + "\"    \n                        >" + btnText + "</a>";
    }

    output += "</div>\n            </div>\n            </div>\n            </div>\n        </div>";
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
  function Cart(modal, cookie, softwareCookie) {
    this.machformBase = 'https://forms.feinberg.northwestern.edu/view.php?id=48491';
    this.basket = [];
    this.mappedBasket = [];
    this.softwareAltIds = [];
    this.cartCount = 0;
    this.cartTotal = 0; //button text 

    this.cartBtnTxt = {
      'Add': 'Add To Cart',
      'Remove': 'Remove From Cart',
      'Info': 'More Info'
    };
    this.modal = modal;
    this.cookie = cookie;
    this.softwareCookie = softwareCookie;
    this.makeCartInBrowser();
  }

  Cart.prototype.mapCart = function () {
    this.mappedBasket = this.basket.map(function (row) {
      return row.id;
    }); //map basket again to track software

    this.softwareAltIds = this.basket.map(function (row) {
      if (row.renew) {
        return row.id;
      }
    });

    if (this.mappedBasket.length > 0) {
      var mappedBasketToCookie = JSON.stringify(this.mappedBasket);
      this.cookie.setCookie(mappedBasketToCookie, 1);

      if (this.softwareAltIds.length > 0) {
        var softwareAltCookie = JSON.stringify(this.mappedBasket);
        this.softwareCookie.setCookie(softwareAltCookie, 1);
      } else {
        this.softwareCookie.deleteCookie();
      }
    } else {
      this.cookie.deleteCookie();
      this.softwareCookie.deleteCookie();
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

      if (positionInBasket === -1 || positionInBasket === undefined) {
        var result = this.addToBasket(item); //update the disable software select for software items only

        if (result) {
          // this.disableSoftwareSelect(item);
          this.toggleSoftwareSelects(item.id);
        }

        this.updateCartTotalAndCount();
        return result;
      } else {
        var deletedItem = this.removeFromBasket(positionInBasket)[0];
        var atcBtns = document.getElementsByClassName('atcBtn');

        for (var i = 0; i < atcBtns.length; i++) {
          var dataId = atcBtns[i].getAttribute('data-id');

          if (deletedItem['id'] == dataId) {
            this.toggleATCbutton(atcBtns[i], false); //this.unRenewSelect( dataId );

            this.toggleSoftwareSelects(dataId);
          }
        }

        this.updateCartTotalAndCount();
        return false;
      }
    } else {
      if (item.id != null || item.id != null) {
        var result = this.addToBasket(item);

        if (result) {
          this.toggleSoftwareSelects(item.id);
        }

        this.updateCartTotalAndCount();
        return result;
      }
    }
  }; //if item is within the basket then it disables the select box(es), if not, it enables the selects


  Cart.prototype.toggleSoftwareSelects = function (id) {
    if (id) {
      var selectDropDowns = document.querySelectorAll('select[data-id="' + id + '"]');

      if (this.inBasket(id) != -1) {
        selectDropDowns.forEach(function (selectEl) {
          selectEl.setAttribute('disabled', 'disabled');
        });
      } else {
        selectDropDowns.forEach(function (selectEl) {
          selectEl.removeAttribute('disabled');
        });
      }
    }
  };

  Cart.prototype.addToBasket = function (item) {
    this.basket.push(item);
    return true;
  };

  Cart.prototype.removeFromBasket = function (positionInBasket) {
    return this.basket.splice(positionInBasket, 1);
  };

  Cart.prototype.inBasket = function (incomingID) {
    var result = -1;
    this.basket.forEach(function (basketItem, i) {
      if (basketItem.id === incomingID) {
        result = i;
      }
    });
    return result;
  };

  Cart.prototype.totalCart = function () {
    if (this.basket.length > 0) {
      var cartTotal_1 = 0;
      this.basket.forEach(function (item) {
        cartTotal_1 += parseFloat(removeSpecialChars(item.price));
      });
      return cartTotal_1;
    }
  };

  Cart.prototype.countCart = function () {
    return this.basket.length;
  };

  Cart.prototype.updateCartTotalAndCount = function () {
    this.mapCart();
    this.cartTotal = this.totalCart();
    this.cartCount = this.countCart();

    if (this.cartCount > 0) {
      document.getElementById('cart').style.height = "75px";
      var cartInfoTxt = '';

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
  };

  Cart.prototype.makeCartInBrowser = function () {
    var _this = this;

    var x = "<div id=\"cart\">\n                    <div>\n                        <div id=\"cartLeft\"></div>\n                        <div id=\"cartRight\">\n                            <a id=\"viewCart\" class=\"button\">View Cart</a>\n                        </div>\n                    </div>\n                </div>"; // document.getElementById('headerWrapper').insertAdjacentHTML('afterbegin', x);

    document.body.insertAdjacentHTML('beforeend', x); //view cart button listener

    document.getElementById('viewCart').addEventListener('click', function (e) {
      var cartList = _this.listCart();

      if (_this.cartTotal > 0) {
        _this.modal.openOverlay(cartList);

        _this.wireUpCartDeletes();

        _this.wireUpCartCheckoutBtn();

        e.preventDefault();
      } else {
        _this.modal.closeOverlay(document.getElementById(_this.modal.overlayContainerGuts), document.getElementById(_this.modal.overlayContainerID), window.scrollY);
      }
    });
  };

  Cart.prototype.wireUpCartCheckoutBtn = function () {
    var _this = this;

    document.getElementById('checkoutNow').addEventListener('click', function (e) {
      return __awaiter(_this, void 0, void 0, function () {
        var checkoutURL, allATCbtns, i;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              e.preventDefault();
              return [4
              /*yield*/
              , this.makeCheckoutURL()];

            case 1:
              checkoutURL = _a.sent(); //clear the cart

              this.basket = [];
              return [4
              /*yield*/
              , this.mapCart()];

            case 2:
              _a.sent(); //clear the cookie


              return [4
              /*yield*/
              , this.cookie.deleteCookie()];

            case 3:
              //clear the cookie
              _a.sent(); //make sure cart feature at bottom of page is gone


              return [4
              /*yield*/
              , this.updateCartTotalAndCount()];

            case 4:
              //make sure cart feature at bottom of page is gone
              _a.sent();

              allATCbtns = document.getElementsByClassName('atcBtn');

              for (i = 0; i < allATCbtns.length; i++) {
                allATCbtns[i].classList.remove('onCart');
              }

              if (!this.modal.isOpen) return [3
              /*break*/
              , 6];
              return [4
              /*yield*/
              , this.modal.closeOverlay(document.getElementById(this.modal.overlayContainerGuts), document.getElementById(this.modal.overlayContainerID), window.scrollY)];

            case 5:
              _a.sent();

              _a.label = 6;

            case 6:
              e.target.href = checkoutURL;
              window.location = checkoutURL;
              return [2
              /*return*/
              ];
          }
        });
      });
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
        cartlistOutput_1 += "<div class=\"cartRow\">\n                    <div class=\"crImg\">";

        if (row.image != '/') {
          cartlistOutput_1 += "<img src=\"https://feinberg-dev.fsm.northwestern.edu/it-new/" + row.image + "\" alt=\"" + row.title + "-image\" />";
        }

        cartlistOutput_1 += "</div>\n                    <div class=\"crDesc\">\n                        <p>" + row.title;

        if (row.catStr.includes('software')) {
          if (row.renew) {
            cartlistOutput_1 += " - Renewing";
          }
        }

        cartlistOutput_1 += "</p>\n                        <a class=\"crDeleteEmbed\" data-basket-position=\"" + i + "\" >Delete</a>\n                    </div>\n                    <div class=\"crDelete\"> \n                        <p><a class=\"crDeleteBtn\" data-basket-position=\"" + i + "\" href=\"\">Delete</a></p>\n                    </div>\n                    <div><p>$" + _this.numberWithCommas(row.price, false) + "</p></div>\n                </div>";
      });
      cartlistOutput_1 += "\n                <div class=\"cartRow\">\n                    <div class=\"crImg\">&nbsp;</div>\n                    <div class=\"crDesc\">&nbsp;</div>\n                    <div class=\"crDelete\">Total:</div>\n                    <div>$" + this.numberWithCommas(this.totalCart(), true) + "</div>\n                </div>\n                <div class=\"cartRow\">\n                    <div class=\"checkoutRow\">\n                        <a id=\"checkoutNow\" href=\"#\" class=\"button\">Checkout Now</a> \n                    </div>\n                </div>\n            ";
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

  Cart.prototype.makeCheckoutURL = function () {
    if (this.basket.length > 0) {
      var url = this.machformBase + '&';

      for (var i = 0; i < this.basket.length; i++) {
        if (this.basket[i].catStr.includes('software')) {
          if (this.basket[i].renew) {
            url += this.basket[i].renewElement + '=1';
          } else {
            url += this.basket[i].element + '=1';
          }
        } else {
          url += this.basket[i].element + '=1';
        }

        if (i + 1 < this.basket.length) {
          url += '&';
        }
      }

      return url;
    } else {
      return null;
    }
  };

  return Cart;
}();

var Store =
/** @class */
function () {
  function Store(containerID, cart, modal, cookie, softwareCookie) {
    this.apiURL = 'https://feinberg-dev.fsm.northwestern.edu/it-new/ws/json-api.php';
    this.items = [{}];
    this.modal = modal;
    this.cookie = cookie;
    this.softwareCookie = softwareCookie;
    this.cart = cart;
    this.containerEL = document.getElementById(containerID); // this.stockTheShelves();

    this.wireUpAddToCartClicks();
  }

  Store.prototype.wireUpAddToCartClicks = function () {
    var _this = this;

    var _loop_3 = function _loop_3(el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var num = el.getAttribute('data-num');

        var output = _this.items[num].outputOverlay(num);

        _this.modal.openOverlay(output);

        var atcModalBtn = document.getElementById('atcModalBtn');

        if (atcModalBtn != null) {
          atcModalBtn.addEventListener('click', function (e) {
            return __awaiter(_this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    //Change the modal atc button 
                    return [4
                    /*yield*/
                    , this.addToCartToggle(num, atcModalBtn)];

                  case 1:
                    //Change the modal atc button 
                    _a.sent(); //check if item is software, if so toggle the select disable attribute 
                    //depending on if its on the cart or not


                    if (this.items[num].catStr.includes('software')) {
                      // this.cart.toggleSoftwareSelects( this.items[num].id );
                      this.cart.toggleSoftwareSelects(this.items[num]['id']);
                    } //the cart toggle above only applies the modal add to cart button so...
                    //once it's been added to cart and the modal cart button has been toggled
                    //map the cart


                    this.cart.mapCart(); //withe the cart mapped by id, we can check for it and update the prod box id appropiately

                    if (this.cart.mappedBasket.includes(this.items[num].id)) {
                      //the item is on the cart, change the prodbox btn to orange
                      this.cart.toggleATCbutton(el.getElementsByClassName('atcBtn')[0], true);
                    } else {
                      //the item is not on the cart, change the prodbox btn to purple
                      this.cart.toggleATCbutton(el.getElementsByClassName('atcBtn')[0], false);
                    }

                    return [2
                    /*return*/
                    ];
                }
              });
            });
          });
        } //wireup event listener to ATC button 

      });
    }; //add event listener to all product item feature boxes


    for (var _i = 0, _a = document.getElementsByClassName('prodBox'); _i < _a.length; _i++) {
      var el = _a[_i];

      _loop_3(el);
    }

    var _loop_4 = function _loop_4(elBtn) {
      elBtn.addEventListener('click', function (e) {
        var num = elBtn.getAttribute('data-num');

        if (_this.items[num].price != '0.00') {
          //check if it's software
          if (_this.items[num].categories.value.includes('software')) {
            //it is software, check selector value, and set the item.renew property
            var selectInput = document.querySelector('article[data-id="' + _this.items[num].id + '"] select.renewInput');
            var selectVal = selectInput.options[selectInput.selectedIndex].value;
            _this.items[num].renew = selectVal == 'renew' ? true : false;
          }

          _this.addToCartToggle(num, elBtn);

          e.preventDefault();
          e.stopPropagation();
        } else {
          var theeItem = _this.items[num];
          var output = theeItem.outputOverlay(num);

          _this.modal.openOverlay(output);

          e.preventDefault();
          e.stopPropagation();
        }
      });
    }; //atc buttons on page (not modal)


    for (var _b = 0, _c = document.getElementsByClassName('atcBtn'); _b < _c.length; _b++) {
      var elBtn = _c[_b];

      _loop_4(elBtn);
    } //add software select addEventListner, and stop event propagation 


    for (var _d = 0, _e = document.getElementsByClassName('renewInput'); _d < _e.length; _d++) {
      var elrenew = _e[_d]; // elrenew.addEventListener('click', (e) => {
      //     let selectVal = elrenew.options[filterOS.selectedIndex].value;
      //     e.preventDefault();
      //     e.stopPropagation();
      // });                
    }
  };

  Store.prototype.addToCartToggle = function (num, elBtn) {
    var cartResult = this.cart.addOrRemoveFromCart(this.items[num]);

    if (cartResult) {
      this.items[num].onCart = true;
      this.cart.toggleATCbutton(elBtn, true);
    } else {
      this.items[num].onCart = false;
      this.cart.toggleATCbutton(elBtn, false); //if its coming off the cart then you need to clear the renew selection too.

      this.items[num].renew = false;
    }
  };

  Store.prototype.numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return Store;
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

var itAlert =
/** @class */
function () {
  function itAlert(modal, type) {
    this.hasAlerts = {
      'either': false,
      'homepageAlert': false,
      'purchasingAlert': false
    };
    this.modal = modal;
    this.getAlerts();

    if (type == 'purchasing') {
      //purchasing page
      this.baseEL = document.getElementById('main-content');
      this.type = 'purchasing';
    } else {
      //hompage
      this.baseEL = document.getElementById('homepageContent');
      this.type = 'homepage';
    }
  }

  itAlert.prototype.chooseColor = function (color) {
    if (color == "Red") {
      return ' itDanger ';
    } else {
      return ' itPrimary ';
    }
  };

  itAlert.prototype.buildBox = function (alert) {
    var alertBox = "<div class=\"contain-1440 itAlert " + this.chooseColor(alert.color) + " \">\n                    <div class=\"contain-1120\">\n                    <!-- <i class=\"fa fa-exclamation-triangle fa-2x\">&nbsp;</i> -->\n                    <h3>" + alert.title + "</h3>\n                    <p>" + alert.blurb + "</p>";

    if (typeof alert.modal !== 'undefined') {
      alertBox += "<p><a id=\"alertTrigger\" href=\"#\">Read more</a></p>";
    }

    alertBox += "</div>  \n                </div>";
    console.log('inside:', alertBox);
    return alertBox;
  };

  itAlert.prototype.buildModalGuts = function (alert) {
    return "<div class=\"bootstrap-wrapper\"> \n                    <div class=\"container\">\n                        <div class=\"row alertRow\">\n                            <div class=\"col-12\">" + alert.modal + "</div>\n                        </div>\n                    </div>\n                </div>";
  };

  itAlert.prototype.addAlertBoxToPage = function () {
    var _modalClass = this.modal;
    var modalBox = '';

    if (this.type == 'homepage') {
      var alertBox = this.buildBox(this.alerts['homepageAlert']);

      if (this.alerts['homepageAlert']['modal'] != '') {
        modalBox = this.buildModalGuts(this.alerts['homepageAlert']);
      }

      this.baseEL.insertAdjacentHTML('afterbegin', alertBox);
    } else {
      console.log('Before: ', this.alerts['purchasingAlert']);
      var alertBox = this.buildBox(this.alerts['purchasingAlert']);

      if (this.alerts['purchasingAlert']['modal'] != '') {
        modalBox = this.buildModalGuts(this.alerts['purchasingAlert']);
      }

      this.baseEL.querySelector('h1:first-of-type').insertAdjacentHTML('afterend', '<section>' + alertBox + '</section>');
    }

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
              //homepage alert is set, but check that were on the homepage page
              if (this.type == 'homepage') {
                this.hasAlerts.either = this.hasAlerts.homepageAlert = true;
              }
            }

            if (results['purchasingAlert']) {
              //purchasing alert is set, but check that were on the purchasing page
              if (this.type == 'purchasing') {
                this.hasAlerts.either = this.hasAlerts.purchasingAlert = true;
              }
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
  var shoppingCookie = new Cookie('fsmITPurchasing');
  var softwareCookie = new Cookie('fsmITPurchasingSoftware');
  var shoppingModal = new Modal();
  var shoppingCart = new Cart(shoppingModal, shoppingCookie, softwareCookie);
  var store = new Store('shopping-cart', shoppingCart, shoppingModal, shoppingCookie, softwareCookie);
  var alert = new itAlert(shoppingModal, 'purchasing');
};