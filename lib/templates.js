var fs = require('fs');

/**
 * Expose Template
 */

module.exports = Template;

/**
 * Template Constructor
 *
 * Allows the use of individual template rendering engines
 * and directories for each card in a Card-Catalog.
 *
 * To do this it builds a cache that matches relative paths
 * exposed in a route handler to fully qualified paths on the
 * filesystem. It builds an object similar to the following for
 * each card that defines a template location:
 *
 *   {
 *     'card_slug': {
 *       'engine': 'ejs',
 *       'templates': {
 *         'users/index': '/path/to/file/directory/index.ejs',
 *         'users/new': '/path/to/file/directory/new.ejs'
 *        }
 *      }
 *    }
 *
 * @params
 * options {Object} - options available to constructor methods.
 */

function Template(options) {
  options = options || {};
  this.folders = options.folders || [];
  this.cache = {};
  this.engines = {};
}

/**
 * Add a Card's template directory string to `this.folders` array
 * for use in building an expanded cache object.
 *
 * @params
 * cards {Object} - all the cards available in a catalog
 */

Template.prototype.expand_cards = function expand_cards(cards) {
  var self = this;

  Object.keys(cards).forEach(function(name) {
    var folder = {},
        card = cards[name];

    if(card.templates) {
      folder.name = card.slug;
      folder.directory = card.templates;
    }

    if(card.engine) {
      folder.ext = card.engine[0];
      self.engines[card.slug] = {};
      self.engines[card.slug][folder.ext] = card.engine[1];
    }

    if(Object.keys(folder).length > 0) self.folders.push(folder);
  });

};

/**
 * Build the Template Cache
 *
 * Goes through each card's template directory specified
 * in `this.folders` and builds a cache object for it.
 */

Template.prototype.build_cache = function build_cache() {
  var _subdirs = [],
      _templates = {};

  this.folders.forEach(function(obj) {

    _templates[obj.name] = {
      engine: obj.ext,
      templates: {}
    };

    function read_dir(dir) {
      var files = fs.readdirSync(dir),
          subdir,
          name;

      if(_subdirs.length > 0) subdir = _subdirs.pop();

      files.forEach(function(file) {

        // Check if file is a directory
        var stats = fs.statSync(dir + '/' + file);
        if(stats.isDirectory()) {
          _subdirs.push(file);
          return read_dir(dir + '/' + file);
        }

        name = subdir ? subdir + '/' : '';
        name += file.split('.').shift();

        _templates[obj.name].templates[name.toString()] = dir + '/' + file;
      });
    }

    read_dir(obj.directory);
  });

  this.cache = _templates;
};