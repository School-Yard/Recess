var http = require('http');

/**
 * Request prototype.
 */

var req = module.exports = {
  __proto__: http.IncomingMessage.prototype
};