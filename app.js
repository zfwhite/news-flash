var express = require('express'),
    app = express(),
    watson = require('watson-developer-cloud'),
    jsonParser = require('body-parser').json(),
    request = require('request');

app.use(express.static('public'));
app.use(jsonParser);

var alchemy_data_news = watson.alchemy_data_news({
  api_key: '3333158ad0e2ef353a7944bcf42b47016a390b7b'
});

app.post('/search', function(req, res) {
  console.log(req.body.send);
  var params = {
    start: 'now-1d',
    end: 'now',
    count: 5,
    return: ['enriched.url.url,enriched.url.title'],
    'q.enriched.url.enrichedTitle.keywords.keyword.text': req.body.send
  }

  alchemy_data_news.getNews(params, function (err, news) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(news, null, 2));
    res.send(news);
  });
});

app.listen(3000);
