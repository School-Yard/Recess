var consolidate = require('consolidate');

/**
 * Middleware init function
 *
 * @param {Object} options
 * @return {function} function(req, res, next)
 */
module.exports = function(options) {

  /**
   * Response middleware adds functions and objects to the
   * response when it comes in.
   *
   * TODO: Find a more efficient way to do this.
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  return function(req, res, next) {

    /**
     * Stringify a javascript object and response to the request.
     *
     * @param {Object} data
     * @param {Number} status
     */
    res.json = function(data, status) {
      var msg = JSON.stringify(data);

      res.writeHead((status || 200), {
        'Content-Type': 'application/json',
        'Content-Length': msg.length
      });
      res.end(msg);
    };

    /**
     * Render a template using the given templating engine
     *
     * @param {String} tmpl
     * @param {Object} data
     * @param {function} callback
     */
    res.render = function(tmpl, data, callback) {
      var ext = /^\w+.(\w+)$/.test(tmpl) && RegExp.$1,
          engine = consolidate[ext],
          template = this.templates ? this.templates + tmpl : tmpl;

      if(!engine || typeof engine !== 'function') throw new Error('Template extension now found');

      engine(template, data, function(err, html) {
        if(err && callback) return callback(err);
        if(err) res.send('Internal Error', 500);
        return res.send(html);
      });
    };

    /**
     * Send a message back to the client
     *
     * @param {Object || String} data
     * @param {Number} status
     * @param {String} mime
     */
    res.send = function(data, status, mime) {
      if(!data) throw new Error('res.send takes a data argument');
      if(typeof data === 'object') return res.json(data, status);

      status = status || 200;
      mime = mime || 'text/html';

      res.writeHead(status, {
        'Content-Type': mime,
        'Content-Length': data.length
      });
      res.end(data);
    };


    /**
     * Go to the next middleware.
     */
    return next();
  };

};