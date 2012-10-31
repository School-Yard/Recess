var server = require('./support/server'),
    request = require('supertest'),
    should = require('should');

function req(ct) {
  var app = server();
  var _req = app.request;
  _req.headers = { 'content-type': ct };
  return _req;
}

describe('req', function() {
  describe('.is()', function() {
    it('should ignore charset', function() {
      req('application/json; charset=utf-8')
      .is('json')
      .should.equal(true);
    });

    describe('when content-type is not present', function(){
      it('should return false', function(){
        req('')
        .is('json')
        .should.equal(false);
      });
    });

    describe('when given an extension', function(){
      it('should lookup the mime type', function(){
        req('application/json')
        .is('json')
        .should.equal(true);

        req('text/html')
        .is('json')
        .should.equal(false);
      });
    });

    describe('when given a mime type', function(){
      it('should match', function(){
        req('application/json')
        .is('application/json')
        .should.equal(true);

        req('image/jpeg')
        .is('application/json')
        .should.equal(false);
      });
    });
  });
});