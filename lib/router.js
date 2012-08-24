var card_catalog = require('cardcatalog');

/**
 * Expose Router
 */

module.exports = Router;

/**
 * Router Constructor
 *
 * Uses Card-Catalog to dispatch requests to matching
 * route handlers. For more read up on Card-Catalog at:
 * https://github.com/TxSSC/Card-Catalog
 *
 * @params
 * options {Object} - options to make available in router methods.
 */

function Router(options) {
  this.options = options || {};
  this.settings = {};
  this.middleware = [];
  this.cards = [];
  this.catalog = {};
}

/**
 * Add a setting to be applied to
 * Card-Catalog `Category` constructor.
 *
 * @params
 * setting {String} - a key to set
 * val {Any} - a value to assign to the key
 */

Router.prototype.set = function set(setting, val) {
  this.settings[setting] = val;
};

/**
 * Add a middleware function to run
 * before a request is dispatched.
 *
 * @params
 * fn {Function} - a function that matchs the (res, res, next)
 *                 signature or emits a `next` event on res.
 */

Router.prototype.add_middleware = function add_middleware(fn) {
  this.middleware.push(fn);
};

/**
 * Add a card to the Category collection.
 *
 * @params
 * card {Object|Function} - a card to use with card catalog
 */

Router.prototype.add_card = function add_card(card) {
  this.cards.push(card);
};

/**
 * Dispatch a request to the Card-Catalog's
 * `Category.dispatch()` method.
 *
 * @params
 * req {http.IncomingMessage} - an incoming request object
 * res {http.ServerResponse} - a server response object
 */

Router.prototype.dispatch = function dispatch(req, res) {
  this.catalog.dispatch(req, res);
};

/**
 * Create a new Card-Catalog Category instance.
 *
 * Applies the settings to a new `Category` instance
 * and loads all the cards and middleware.
 *
 * @params
 * cb {Function} - a callback to run when category and cards
 *                 are loaded. Returns the cards object to the function.
 */

Router.prototype.create_catalog = function create_catalog(cb) {
  var self = this;

  this.catalog = new card_catalog.Category(this.settings);

  this.catalog.on('loaded', function() {

    // Load cards into catalog
    self.load_cards();

    // Set Middleware
    self.catalog.before = self.middleware;

    cb(self.catalog.cards);
  });

  this.catalog.load();
};

/**
 * Load cards array into the catalog.
 */

Router.prototype.load_cards = function load_cards() {
  this.catalog.addCards({
    cards: this.cards
  });
};

/**
 * Helper for `Category.attach()`
 *
 * @params
 * category {Object} - a new category to add to the cache
 */

Router.prototype.attach = function attach(category) {
  this.catalog.attach(category);
};

/**
 * Helper for `Category.detach()`
 *
 * @params
 * category {Object} - a category to remove from the cache
 */

Router.prototype.detach = function attach(category) {
  this.catalog.detach(category);
};