var app = angular.module('news', []);

app.controller('searchController', search);

search.$inject = ['$http'];

function search($http) {
  var vm = this;
  vm.newsStories = [{story:{source:{enriched:{url:{title: 'title!'}}}}}];

  vm.sendSearch = function() {
    var send = vm.term;
    var sendRequest = $http({
      method: 'POST',
      url: '/search',
      headers: {
        'Content-type': 'application/json'
      },
      data: JSON.stringify({send})
    });
    sendRequest.then(function successCallback(response) {
      console.log(response.data.result.docs[0].source.enriched.url.title);
      response.data.result.docs.forEach(function(doc) {
        vm.newsStories.push(doc)
      });
      console.log('stories:' + vm.newsStories);

    })
    vm.term = null;
  }
}
