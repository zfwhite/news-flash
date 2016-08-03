var express = require('express'),
    app = express(),
    watson = require('watson-developer-cloud'),
    jsonParser = require('body-parser').json(),
    mockData = require('./mockData.json')
    addQuery = require('./data');

app.use(express.static('public'));
app.use(jsonParser);

var alchemy_data_news = watson.alchemy_data_news({
  api_key: '3333158ad0e2ef353a7944bcf42b47016a390b7b'
});

app.post('/search/positive', function(req, res) {
  if (req.body.send == undefined) {
    res.send('blank');
  }
  addQuery(req.body.send);
  var rawSearch = req.body.send.split(' ').join('^');
  var optimizedSearch = 'A[' + rawSearch + ']';
  var params = {
    start: 'now-7d',
    end: 'now',
    count: 5,
    return: ['enriched.url.url,enriched.url.title,enriched.url.text'],
    'q.enriched.url.enrichedTitle.docSentiment': '|type=positive,score=>.7|',
    'q.enriched.url.enrichedTitle.keywords.keyword.text': optimizedSearch
  }
  
  alchemy_data_news.getNews(params, function (err, news) {
  if (err) {
    console.log('error:', err);
    res.sendFile(__dirname + '/mockData.json');
  }
  else {
    console.log(JSON.stringify(news, null, 2));
    res.send(news);
  }
  });

  res.sendFile(__dirname + '/mockData.json');
});

app.post('/search/negative', function(req, res) {
  if (req.body.send == undefined) {
    res.send('blank');
  }
  addQuery(req.body.send);
  var rawSearch = req.body.send.split(' ').join('^');
  var optimizedSearch = 'A[' + rawSearch + ']';
  var params = {
    start: 'now-7d',
    end: 'now',
    count: 5,
    return: ['enriched.url.url,enriched.url.title,enriched.url.text'],
    'q.enriched.url.enrichedTitle.docSentiment': '|type=positive,score=<.3|',
    'q.enriched.url.title': optimizedSearch
  }

  alchemy_data_news.getNews(params, function (err, news) {
  if (err) {
    console.log('error:', err);
    res.sendFile(__dirname + '/mockData.json');
  }
  else {
    console.log(JSON.stringify(news, null, 2));
    res.send(news);
  }
  });
});
app.listen(3000);
