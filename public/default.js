var app = angular.module('news', []);

app.controller('searchController', search);

search.$inject = ['$http'];

function search($http) {
  var vm = this;
  vm.newsStories = [];
  vm.searches = [];

  vm.recentQueries = function() {
    $http.get('/recent').then(function successCallback(response) {
      vm.newsStories = [];
      response.data.forEach(function(search) {
        vm.searches.push(search);
      })
    })
  }

  vm.sendPositive = function() {
    vm.searches = [];
    vm.newsStories = [];
    var send = vm.term;
    var sendRequest = $http({
      method: 'POST',
      url: '/search/positive',
      headers: {
        'Content-type': 'application/json'
      },
      data: JSON.stringify({send})
    });
    sendRequest.then(function successCallback(response) {
      response.data.result.docs.forEach(function(doc) {
        vm.newsStories.push(doc)
      });
    })
    vm.term = null;
  }

  vm.sendNegative = function() {
    vm.searches = [];
    vm.newsStories = [];
    var send = vm.term;
    var sendRequest = $http({
      method: 'POST',
      url: '/search/negative',
      headers: {
        'Content-type': 'application/json'
      },
      data: JSON.stringify({send})
    });
    sendRequest.then(function successCallback(response) {
      response.data.result.docs.forEach(function(doc) {
        vm.newsStories.push(doc)
      });
    })
    vm.term = null;
  }
}
