var Library = require('library'),
    recess = exports;

recess.card_catalog = function card_catalog(options) {

  options = options || {};

  // Catalog Data Connection required
  if (!options.data_connection) {
    throw new Error('card_catalog() a data_connection is required to read categories');
  }

  if (!options.namespace) {
    throw new Error('card_catalog() a namespace is required to read categories');
  }

  var ready = false;

  // Create a new catalog using the storage adapter
  // and pass in a namespace.
  var catalog = Library.create_catalog(options.data_connection, options.namespace);

  catalog.on('ready', function() {
    ready = true;
  });

  return function dispatch(req, res, next) {
    if(!ready) next(new Error('Card Catalog not fully loaded'));

    catalog.dispatch(req, res, function(err) {
      return next(err);
    });
  };
};