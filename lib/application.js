var http = require('http'),
    Router = require('./router'),
    Templates = require('./templates');

/**
 * Application prototype
 */

var app = module.exports = {};

/**
 * Initialize the application
 *
 *   - create an empty router object
 *   - create an empty template cache
 */

app.init = function init() {
  this.router = new Router();
  this.templates = new Templates();
};

/**
 * Set Card-Catalog configuration settings
 * or use when instantiating a new catalog.
 *
 * @params
 * setting {String} - a key to set
 * val {Any} - a value to assign to the key
 */

app.set = function set(setting, val) {
  this.router.set(setting, val);
  return this;
};

/**
 * Add a middleware function to run
 * before a request is dispatched.
 *
 * @params
 * fn {Function} - a function that matchs the (res, res, next)
 *                 signature or emits a `next` event on res.
 */

app.before = function before(fn) {
  this.router.add_middleware(fn);
  return this;
};

/**
 * Add a card to the Router catalog.
 *
 * @params
 * card {Object|Function} - a card to use with card catalog
 */

app.card = function add_card(card) {
  this.router.add_card(card);
  return this;
};

/**
 * Request Handler
 *
 * A function that is called when a request event is fired.
 * It combines the incoming request and response with the
 * app req and res prototypes and dispatches out to the router.
 *
 * @params
 * req {http.IncomingMessage} - an incoming request object
 * res {http.ServerResponse} - a server response object
 */

app.handle = function(req, res) {
  req.__proto__ = this.request;
  res.__proto__ = this.response;

  // Set app properties
  req.app = this;
  res.app = this;

  // Dispatch to catalog
  this.router.dispatch(req, res);
};

/**
 * Create Catalog
 */
app.create = function create() {
  var self = this;

  this.router.create_catalog(function(cards) {
    
    // Create template cache
    self.templates.expand_cards(cards.cache);
    self.templates.build_cache();
    
    self.emit('ready');
  });
};

/**
 * Listen for connections.
 *
 * Assumes all configuration and setup have been completed and
 * creates a new catalog for the router. Uses the cards to see if
 * any template directories are set and builds a template cache.
 *
 * Returns a node `http.Server`
 */

app.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};