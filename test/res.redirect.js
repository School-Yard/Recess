var server = require('./support/server'),
    request = require('supertest'),
    should = require('should');

describe('res', function() {
  describe('.redirect(url)', function() {
    it('should default to a 302 redirect', function(done) {
      var app = server();

      app.before(function(req, res) {
        res.redirect('http://google.com');
      });

      app.on('ready', function() {
        request(app)
        .get('/foo/bar')
        .end(function(err, res){
          res.statusCode.should.equal(302);
          res.headers.should.have.property('location', 'http://google.com');
          done();
        });
      });

      app.create();
    });

    describe('with leading /', function() {
      it('should construct relative urls', function(done) {
        var app = server();

        app.before(function(req, res) {
          res.redirect('/');
        });

        app.on('ready', function() {
          request(app)
          .get('/foo/bar')
          .end(function(err, res){
            res.statusCode.should.equal(302);
            res.headers.should.have.property('location', '/');
            done();
          });
        });

        app.create();
      });
    });
  });
});