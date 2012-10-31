var server = require('./support/server'),
    request = require('supertest'),
    should = require('should');

describe('req', function() {
  describe('.accepts(type)', function() {
    it('should return true when Accept is not present', function(done) {
      var app = server();

      app.before(function(req, res){
        res.send(req.accepts('json') ? 'yes' : 'no');
      });

      app.on('ready', function() {
        request(app)
        .get('/foo/bar')
        .end(function(err, res){
          res.text.should.equal('yes');
          done();
        });
      });

      app.create();
    });

    it('should return true when Accept is present', function(done) {
      var app = server();

      app.before(function(req, res){
        res.send(req.accepts('json') ? 'yes' : 'no');
      });

      app.on('ready', function() {
        request(app)
        .get('/foo/bar')
        .set('Accept', 'application/json')
        .end(function(err, res){
          res.text.should.equal('yes');
          done();
        });
      });

      app.create();
    });

    it('should return false otherwise', function(done) {
      var app = server();

      app.before(function(req, res){
        res.send(req.accepts('json') ? 'yes' : 'no');
      });

      app.on('ready', function() {
        request(app)
        .get('/foo/bar')
        .set('Accept', 'text/html')
        .end(function(err, res){
          res.text.should.equal('no');
          done();
        });
      });

      app.create();
    });
  });
});