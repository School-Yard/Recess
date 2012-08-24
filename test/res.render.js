var server = require('./support/server'),
    request = require('supertest'),
    should = require('should'),
    consolidate = require('consolidate');

describe('res', function() {
  describe('.render(template)', function() {
    it('should support absolute paths', function(done) {
      var app = server();

      app.before(function(req, res){
        res.render(__dirname + '/fixtures/body.ejs');
      });

      app.on('ready', function() {
        request(app)
        .get('/foo/bar')
        .expect('<h1>Hello World</h1>', done);
      });

      app.create();
    });

    describe('when card template engine is set', function() {

      it('should support relative paths', function(done) {
        var app = server();

        app.router.cards[0].prototype.index = function(req, res) {
          res.render('body');
        };

        app.on('ready', function() {
          // Set app templates cache
          app.templates.cache = {
            'bar': {
              'engine': 'ejs',
              'templates': {
                'body': __dirname + '/fixtures/body.ejs'
              }
            }
          };

          app.templates.engines = { 'bar': { 'ejs': consolidate['ejs'] } };

          request(app)
          .get('/foo/bar')
          .expect('<h1>Hello World</h1>', done);
        });

        app.create();
      });
    });
  });

  describe('.render(template, data)', function() {
    it('should support absolute paths', function(done) {
      var app = server();

      var data = { name: 'tobi' };

      app.before(function(req, res){
        res.render(__dirname + '/fixtures/user.ejs', data);
      });

      app.on('ready', function() {
        request(app)
        .get('/foo/bar')
        .expect('<h1>tobi</h1>', done);
      });

      app.create();
    });

    describe('when card template engine is set', function() {

      it('should support relative paths', function(done) {
        var app = server();

        var data = { name: 'tobi' };

        app.router.cards[0].prototype.index = function(req, res) {
          res.render('user', data);
        };

        app.on('ready', function() {
          // Set app templates cache
          app.templates.cache = {
            'bar': {
              'engine': 'ejs',
              'templates': {
                'user': __dirname + '/fixtures/user.ejs'
              }
            }
          };

          app.templates.engines = { 'bar': { 'ejs': consolidate['ejs'] } };

          request(app)
          .get('/foo/bar')
          .expect('<h1>tobi</h1>', done);
        });

        app.create();
      });
    });
  });

  describe('.render(template, data, fn)', function() {
    it('should run callback function', function(done) {
      var app = server();

      var data = { name: 'tobi' };

      app.before(function(req, res){
        res.render(__dirname + '/fixtures/user.ejs', data, function(err, html) {
          html = html.replace('tobi', 'cody');
          res.end(html);
        });
      });

      app.on('ready', function() {
        request(app)
        .get('/foo/bar')
        .expect('<h1>cody</h1>', done);
      });

      app.create();
    });
  });
});