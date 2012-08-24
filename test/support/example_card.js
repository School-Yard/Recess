var card_catalog = require('cardcatalog'),
    util = require('util');

var Example = module.exports = function Example(options) {
  card_catalog.Card.call(this, options);

  this.name = "Example";
  this.slug = "bar";

  // Create the Example routing table
  this.router = {
    'get': {
      '/': this.index,
      '/route': this.testRoute
    }
  };
};

util.inherits(Example, card_catalog.Card);

Example.prototype.index = function (req, res) {
  this.emit('routed');
};

Example.prototype.testRoute = function(req, res) {};
