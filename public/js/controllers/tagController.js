var controllers = require('../app.js').controllers;

controllers.controller('TagController', ['$scope', '$routeParams', 'tagsFactory', '$http', 'loginFactory', function($scope, $routeParams, tagsFactory, $http, loginFactory) {
  if(tagsFactory.curTag !== $routeParams.tag) {
    $scope.tag = tagsFactory.setTagName($routeParams.tag);
  }else{
    $scope.tag = tagsFactory.curTag;
  }

  $scope.currentUser = loginFactory.currentUser;

  $scope.links = tagsFactory.getTagInfo($scope.tag);

  $scope.assignClassUpvote = function(link){
    if(link.curUserVote !== 1){
      return 'up-vote-this';
    } else {
      return 'up-vote-this-after'
    }
  };

  $scope.assignClassDownvote = function(link){
    if(link.curUserVote !== -1){
      return 'down-vote-this';
    } else {
      return 'down-vote-this-after'
    }
  };

  $scope.vote = function(value, link){
    if(link.curUserVote === value){
      console.log('you already voted!');
    } else {
      link.score += value;
      link.curUserVote += value;
      link.value = value;
      $http.post('/_/votes', link).success(function(){
      });
    }
  };

}]);
