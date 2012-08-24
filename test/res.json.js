var server = require('./support/server'),
    request = require('supertest'),
    should = require('should');

describe('res', function() {
  describe('.json(Object)', function() {
    describe('when given an array', function() {
      it('should respond with json', function(done) {
        var app = server();

        app.before(function(req, res){
          res.json(['foo', 'bar', 'baz']);
        });

        app.on('ready', function() {
          request(app)
          .get('/foo/bar')
          .end(function(err, res){
            res.headers.should.have.property('content-type', 'application/json');
            res.text.should.equal('["foo","bar","baz"]');
            done();
          });
        });

        app.create();
      });
    });

    describe('when given an object', function() {
      it('should respond with json', function(done) {
        var app = server();

        app.before(function(req, res){
          res.json({ hello: 'world' });
        });

        app.on('ready', function() {
          request(app)
          .get('/foo/bar')
          .end(function(err, res){
            res.headers.should.have.property('content-type', 'application/json');
            res.text.should.equal('{"hello":"world"}');
            done();
          });
        });

        app.create();
      });
    });
  });

  describe('.json(status, object)', function() {
    it('should respond with json and set the status code', function(done) {
      var app = server();

      app.before(function(req, res){
        res.json(201, { hello: 'world' });
      });

      app.on('ready', function() {
        request(app)
        .get('/foo/bar')
        .end(function(err, res){
          res.statusCode.should.equal(201);
          res.headers.should.have.property('content-type', 'application/json');
          res.text.should.equal('{"hello":"world"}');
          done();
        });
      });

      app.create();
    });
  });
});