var Client = require('mongodb');

var url = 'mongodb://localhost:27017/news';

function add(search) {
  var url = 'mongodb://localhost:27017/news';

  var addSearch = function(db, search) {
    var collection = db.collection('search');

    collection.insertOne(
      {query: search}, function(err, result) {
        console.log('Added query.');
        db.close();
      });
  }

  Client.connect(url, function(err, db) {
    addSearch(db, search);
  });
}

module.exports = add;
