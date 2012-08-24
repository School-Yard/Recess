var trapper_keeper = require('trapperkeeper');

var utils = module.exports = {};

utils.db = function() {
  return trapper_keeper.connect('memory');
};