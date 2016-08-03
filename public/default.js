var app = angular.module('news', []);

app.controller('searchController', search);

search.$inject = ['$http'];

function search($http) {
  var vm = this;
  vm.newsStories = [];

  vm.sendPositive = function() {
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
