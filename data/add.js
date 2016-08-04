var Client = require('mongodb'),
    moment = require('moment');

var url = 'mongodb://localhost:27017/news';

function add(search) {
  var url = 'mongodb://localhost:27017/news';

  var addSearch = function(db, search) {
    var collection = db.collection('search');

    collection.insert(
      {query: search, time: moment().format('MMM Do YYYY, h:mm:ss a')}, function(err, result) {
        db.close();
      });
  }

  Client.connect(url, function(err, db) {
    addSearch(db, search);
  });
}

module.exports = add;
