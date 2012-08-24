var server = require('./support/server');

describe('app.listen()', function() {
  it('should return an HTTP server', function(done) {

    server(function(app) {
      app.listen(9999, function(http) {
        http.close();
        done();
      });
    });

    var app = server();

    app.on('ready', function() {

      var server = app.listen(9999, function() {
        server.close();
        done();
      });

    });

    app.create();

  });
});