var assert = require('chai').assert;
var request = require('request');

describe('Tests user query.', function() {
  it('Sends a search term.', function(done) {
    request({
      method: 'POST',
      url: 'http://localhost:3000/search'
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
