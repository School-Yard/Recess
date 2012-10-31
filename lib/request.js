/**
 * Request.js is heavily based off the work done by TJ Holowaychuk
 * and all the other contributers to Express.js
 *
 * https://github.com/visionmedia/express/blob/master/lib/request.js
 */


var http = require('http'),
    utils = require('./utils'),
    mime = require('mime');

/**
 * Request prototype.
 */

var req = module.exports = {
  __proto__: http.IncomingMessage.prototype
};

/**
 * Return request header.
 *
 * The `Referrer` header field is special-cased,
 * both `Referrer` and `Referer` are interchangeable.
 *
 * @param {String} name
 * @return {String}
 */

req.get = req.header = function(name) {
  name = name.toLowerCase();

  switch (name) {
    case 'referer':
      return this.headers.referrer || this.headers.referer;
    case 'referrer':
      return this.headers.referrer || this.headers.referer;
    default:
      return this.headers[name];
  }
};

/**
 * Check if the given `type(s)` is acceptable, returning
 * the best match when true, otherwise `undefined`, in which
 * case you should respond with 406 "Not Acceptable".
 *
 * The `type` value may be a single mime type string
 * such as "application/json", the extension name
 * such as "json", a comma-delimted list such as "json, html, text/plain",
 * or an array `["json", "html", "text/plain"]`. When a list
 * or array is given the _best_ match, if any is returned.
 *
 * @param {String|Array} type(s)
 * @return {String}
 */

req.accepts = function(type){
  return utils.accepts(type, this.get('Accept'));
};

/**
 * Check if the incoming request contains the "Content-Type"
 * header field, and it contains the give mime `type`.
 *
 * @param {String} type
 * @return {Boolean}
 */

req.is = function(type){
  var ct = this.get('Content-Type');
  if (!ct) return false;
  ct = ct.split(';')[0];
  if (!~type.indexOf('/')) type = mime.lookup(type);
  if (~type.indexOf('*')) {
    type = type.split('/');
    ct = ct.split('/');
    if ('*' == type[0] && type[1] == ct[1]) return true;
    if ('*' == type[1] && type[0] == ct[0]) return true;
    return false;
  }
  return !! ~ct.indexOf(type);
};
