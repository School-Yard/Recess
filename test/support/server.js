var utils = require('./utils'),
    recess = require('../../lib/recess'),
    example_card = require('./example_card');

module.exports = function(cb) {
  var db,
      app;

  db = utils.db();
  app = recess();

  app.set('connection', db);
  app.set('namespace', 'test');
  app.card(example_card);

  // Create a category at /foo/bar
  create_category(db);

  return app;
};

function create_category(db, cb) {
  var test_category = {
    name: 'foo',
    slug: 'foo',
    published: true,
    plugins: [{ 'Example' : { published: true }} ]
  };

  var resource = db.resource('test');
  resource.create(test_category, function() {});
}