/**
 * Response.js is heavily based off the work done by TJ Holowaychuk
 * and all the other contributers to Express.js
 *
 * https://github.com/visionmedia/express/blob/master/lib/response.js
 */

var http = require('http'),
    statusCodes = http.STATUS_CODES,
    mime = require('mime'),
    consolidate = require('consolidate');

/**
 * Response prototype.
 */

var res = module.exports = {
  __proto__: http.ServerResponse.prototype
};

/**
 * Set status code
 *
 * sets the http.ServerResponse statusCode
 *
 * @params
 * code {Number} - valid http status code
 */

res.status = function(code) {
  this.statusCode = code;
  return this;
};

/**
 * Set an http header value
 *
 * @params
 * header {String} - a header field
 * val {String} - value to set
 */

res.set = function set(header, val) {
  this.setHeader(header, val.toString());
  return this;
};

/**
 * Get an http header field value
 *
 * @params
 * field {String} - field to retrieve
 */

res.get = function(field){
  return this.getHeader(field);
};

/**
 * Set http Content-Type value
 *
 * Uses the mime module's lookup method
 *
 * @params
 * type {String} - a mime type to lookup
 */

res.type = function(type) {
  return this.set('Content-Type', mime.lookup(type));
};

/**
 * Send a response
 *
 * Allows the use of:
 *   - res.send(200, 'Hello World')
 *   - res.send('Hello World')
 *
 * @params
 * body | status {Mixed} - body content to send or status code
 * body {Number} - http status code
 */

res.send = function(body) {

  // Allow for (status, body) or (body)
  if(arguments.length == 2) {
    this.statusCode = body;
    body = arguments[1];
  }

  // Set a value for body
  if(body === null || body === undefined) body = '';

  switch(typeof body) {
    // html string
    case 'string':
      if(!this.get('Content-Type')) {
        this.type('html');
      }
      break;

    // status code
    case 'number':
      this.get('Content-Type') || this.type('txt');
      this.status(body);
      body = http.STATUS_CODES[body];
      break;

    // JSON object
    case 'object':
      if(body === null) {
        body = '';
      } else {
        return this.json(body);
      }
      break;
  }

  // Set Content-Length
  if(!this.get('Content-Length')) {
    this.set('Content-Length', body.length);
  }

  // Respond
  this.end(body);
  return this;
};

/**
 * Send a JS object as JSON
 *
 * Stringifies a JS object and sets content-typ
 *
 * @params
 * body | status {Mixed} - body or status code
 * body {Object} - JS object to stringify
 */

res.json = function(body) {

  // Allow for (status, body) or (body)
  if(arguments.length == 2) {
    this.status(body);
    body = arguments[1];
  }

  body = JSON.stringify(body);
  this.set('Content-Type', 'application/json');
  return this.send(body);
};

/**
 * Redirect to a URL
 *
 * Sets the status code to 302 and Location Header.
 *
 * @params
 * url | status {Mixed} - URL string of status code
 * url {String} - a URL string to set as Location header
 */

res.redirect = function(url){
  var status;

  // Allow for (status, url) or (url)
  if(arguments.length == 2) {
    status = url;
    url = arguments[1];
  }

  // Respond
  this.statusCode = status || 302;
  this.headers['Location'] = url;
  this.writeHead(this.statusCode, this.headers);
  this.end();
};