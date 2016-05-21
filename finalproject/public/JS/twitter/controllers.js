var app = angular.module('myApp');
// var app = angular.module('myApp', ['ngSanitize','myApp.services', 'Coordinates']);
//inject the twitterService into the controller
app.controller('TwitterController', function($scope,$q, twitterService, Coordinates) {

    $scope.tweets=[]; //array of tweets

    twitterService.initialize();

    //using the OAuth authorization result get the latest 20 tweets Geotagged at that location
    $scope.refreshTimeline = function(maxId) {
        twitterService.getLatestTweets(maxId).then(function(data) {
            $scope.tweets = data;
            console.log(data);
        },function(){
            $scope.rateLimitError = true;
        });
    }

    //when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectButton = function() {
      console.log('button clicked');
        twitterService.connectTwitter().then(function() {
            if (twitterService.isReady()) {
                //if the authorization is successful, hide the connect button and display the tweets
                $('#connectButton').fadeOut(function(){
                    $('#getTimelineButton, #signOut').fadeIn();
                    // $scope.refreshTimeline(); //this will get Geobuzz after connecting immediatly.
					          $scope.connectedTwitter = true;
                });
            } else {

			         }
        });
    }

    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
    $scope.signOut = function() {
        twitterService.clearCache();
        $scope.tweets.length = 0;
        $('#getTimelineButton, #signOut').fadeOut(function(){
            $('#connectButton').fadeIn();
			$scope.$apply(function(){$scope.connectedTwitter=false})
        });
        $scope.rateLimitError = false;
    }

    //if the user is a returning user, hide the sign in button and display the tweets
    if (twitterService.isReady()) {
        $('#connectButton').hide();
        $('#getTimelineButton, #signOut').show();
     		$scope.connectedTwitter = true;
        $scope.refreshTimeline();
    }

});
