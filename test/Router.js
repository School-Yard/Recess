var recess = require('../lib/recess'),
    Router = recess.Router,
    card_catalog = require('cardcatalog'),
    utils = require('./support/utils'),
    should = require('should');

describe('Router', function() {
  var router, app;

  beforeEach(function() {
    router = new Router();
    app = recess();
  });

  describe('.set(setting, va)', function() {
    it('should create a setting', function() {
      router.set('test', 'abc');
      
      router.settings.test.should.equal('abc');
    });
  });

  describe('.add_middleware(fn)', function() {
    it('should push function to middleware array', function() {
      router.add_middleware(function() {});

      router.middleware.length.should.equal(1);
    });
  });

  describe('.add_card(card)', function() {
    it('should push the card to cards array', function() {
      router.add_card({});

      router.cards.length.should.equal(1);
    });
  });

  describe('.create_catalog(cb)', function() {
    before(function() {
      router.set('connection', utils.db());
      router.add_card({});
    });

    it('should create a Category instance', function(done) {
      router.create_catalog(function() {
        router.catalog.should.be.an.instanceOf(card_catalog.Category);
        done();
      });
    });

    it('should return a cards object', function(done) {
      router.create_catalog(function(cards) {
        cards.should.be.an.instanceOf(card_catalog.CardCollection);
        done();
      });
    });
  });

});