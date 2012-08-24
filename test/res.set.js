var server = require('./support/server'),
    request = require('supertest'),
    recess = require('../lib/recess'),
    res = recess.response;

describe('res', function() {
  describe('.set(setting, val)', function() {
    it('should set the response header field', function(done) {
      var app = server();

      app.before(function(req, res){
        res.set('Content-Type', 'text/x-foo').end();
      });

      app.on('ready', function() {
        request(app)
        .get('/foo/bar')
        .expect('Content-Type', 'text/x-foo')
        .end(done);
      });

      app.create();
    });

    it('should coerce to a string', function(){
      res.headers = {};
      res.set('ETag', 123);
      res.get('ETag').should.equal('123');
    });
  });
});