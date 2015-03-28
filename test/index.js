var assert = require('assert');
var requestSession = require('..');
var request = require('request');

describe('requestSession', function() {
  this.timeout(10000);
  it('GETs a URL', function (done) {
    requestSession('http://google.com', function (error, response, body) {
      if (error) { done(error); }
      assert.equal(response.statusCode, 200);
      done();
    });
  });

    it('GETs a URL with session (save) REQUEST', function (done) {
        request({ url: 'http://google.com' }, function (error, response, body) {
            if (error) { done(error); }
            console.log('request:')
            assert.equal(response.statusCode, 200);
            done();
        });
    });


    it('GETs a URL with session (save)', function (done) {
    requestSession({ url: 'http://google.com', sessionID: '12345' }, function (error, response, body) {
      if (error) { done(error); }
      console.log('requestSession:')
      assert.equal(response.statusCode, 200);
      done();
    });
  });

    it('GETs a URL with session (load)', function (done) {
        requestSession({ url: 'http://google.com', sessionID: '12345' }, function (error, response, body) {
            if (error) { done(error); }
            assert.equal(response.statusCode, 200);
            done();
        });
    });

});