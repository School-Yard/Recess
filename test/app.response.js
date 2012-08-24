var server = require('./support/server'),
    request = require('supertest');

describe('app', function() {

  describe('.response', function() {
    it('should extend the response prototype', function(done) {
      
      var app = server();

      app.response.shout = function(str) {
        this.send(str.toUpperCase());
      };

      app.before(function(req, res) {
        res.shout('hey');
      });

      app.on('ready', function() {
        request(app)
        .get('/foo/bar')
        .expect('HEY', done);
      });

      app.create();
    });
  });
});