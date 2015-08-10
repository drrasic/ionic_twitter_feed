angular.module('twitterFeed.controllers', [])

.controller('AppCtrl', function($scope) {

})

.controller('TwitterFeedCtrl', function($scope, TwitterREST) {
    TwitterREST.sync().then(function(tweets){
        console.log(tweets);
        $scope.tweets = tweets.statuses;
    });

        $scope.innapBrowser = function (value) {
            window.open(value, '_blank');
        };
});
