var EventEmitter = require('events').EventEmitter,
    req = require('./request'),
    res = require('./response'),
    application = require('./application'),
    Router = require('./router'),
    Template = require('./templates'),
    utils = require('./utils');

/**
 * Expose recess createApplication as entry point
 */

exports = module.exports = createApplication;

/**
 * Create a new application.
 *
 * return {Function} - return an app instance
 */

function createApplication() {
  function app(req, res) { app.handle(req, res); }
  utils.merge(app, application);
  utils.merge(app, EventEmitter.prototype);
  app.request = { __proto__ : req };
  app.response = { __proto__ : res };
  app.init();
  return app;
}

/**
 * Expose Prototypes
 */

exports.application = application;
exports.request = req;
exports.response = res;

/**
 * Expose Constructors
 */

exports.Router = Router;
exports.Template = Template;