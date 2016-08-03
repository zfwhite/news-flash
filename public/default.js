var app = angular.module('news', []);

app.controller('searchController', search);

search.$inject = ['$http'];

function search($http) {
  var vm = this;
  vm.newsStories = [];

  vm.sendSearch = function() {
    vm.newsStories = [];
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
      // if (response === 'blank') {
      //   vm.newsStories = [];
      // }
      response.data.result.docs.forEach(function(doc) {
        vm.newsStories.push(doc)
      });
    })
    vm.term = null;
  }
}
