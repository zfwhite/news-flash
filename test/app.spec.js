var assert = require('chai').assert;
var request = require('request');

describe('Tests a positive user query.', function() {
  it('Sends a search term.', function(done) {
    request({
      method: 'POST',
      url: 'http://localhost:3000/search/positive'
    }, function(error, response) {
      assert.equal(response.statusCode, 200);
      done();
    });
  });

  it('Expects a search term.', function(done) {
    request({
      method: 'POST',
      url: 'http://localhost:3000'
    }, function(error, response) {
      assert.equal(response.statusCode, 404);
      done();
    });
  });
});

describe('Tests a negative user query.', function() {
  it('Sends a search term.', function(done) {
    request({
      method: 'POST',
      url: 'http://localhost:3000/search/negative'
    }, function(error, response) {
      assert.equal(response.statusCode, 200);
      done();
    });
  });

  it('Expects a search term.', function(done) {
    request({
      method: 'POST',
      url: 'http://localhost:3000'
    }, function(error, response) {
      assert.equal(response.statusCode, 404);
      done();
    });
  });
});
