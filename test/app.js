var recess = require('../lib/recess'),
    should = require('should');

describe('app', function() {
  it('should inherit from event emitter', function(done) {
    var app = recess();
    app.on('foo', done);
    app.emit('foo');
  });
});