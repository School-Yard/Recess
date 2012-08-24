var server = require('./support/server'),
    request = require('supertest'),
    should = require('should');

describe('res', function() {
  describe('.send(null)', function() {
    it('should set body to ""', function(done) {
      var app = server();

      app.before(function(req, res) {
        res.send(null);
      });

      app.on('ready', function() {
        request(app)
        .get('/foo/bar')
        .expect('', done);
      });

      app.create();
    });
  });

  describe('.send(undefined)', function() {
    it('should set body to ""', function(done){
      var app = server();

      app.before(function(req, res){
        res.send(undefined);
      });

      app.on('ready', function() {
        request(app)
        .get('/foo/bar')
        .expect('', done);
      });

      app.create();
    });
  });

  describe('.send(code)', function() {
    it('should set .statusCode', function(done){
      var app = server();

      app.before(function(req, res){
        res.send(201).should.equal(res);
      });

      app.on('ready', function() {
        request(app)
        .get('/foo/bar')
        .expect(201, done);
      });

      app.create();
    });
  });

  describe('.send(code, body)', function() {
    it('should set .statusCode and body', function(done){
      var app = server();

      app.before(function(req, res){
        res.send(201, 'Hello World');
      });

      app.on('ready', function() {
        request(app)
        .get('/foo/bar')
        .expect('Hello World')
        .expect(201, done);
      });

      app.create();
    });
  });

  describe('.send(String)', function() {
    it('should send as html', function(done){
      var app = server();

      app.before(function(req, res){
        res.send('<p>Hello World</p>');
      });

      app.on('ready', function() {
        request(app)
        .get('/foo/bar')
        .end(function(err, res) {
          res.headers.should.have.property('content-type', 'text/html');
          res.text.should.equal('<p>Hello World</p>');
          res.statusCode.should.equal(200);
          done();
        });
      });

      app.create();
    });

    it('should not override Content-Type', function(done){
      var app = server();

      app.before(function(req, res){
        res.set('Content-Type', 'text/plain').send('hello world');
      });

      app.on('ready', function() {
        request(app)
        .get('/foo/bar')
        .expect('Content-Type', 'text/plain')
        .expect('hello world')
        .expect(200, done);
      });

      app.create();
    });
  });

  describe('.send(Object)', function(){
    it('should send as application/json', function(done){
      var app = server();

      app.before(function(req, res){
        res.send({ hello: 'world' });
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