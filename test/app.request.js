var server = require('./support/server'),
    request = require('supertest');

describe('app', function() {
  describe('.request', function() {
    it('should extend the request prototype', function(done) {

      var app = server();

      app.request.modified = function() {
        return 'true';
      };

      app.before(function(req, res) {
        res.send(req.modified());
      });

      app.on('ready', function() {
        request(app)
        .get('/foo/bar')
        .expect('true', done);
      });

      app.create();
    });
  });
});