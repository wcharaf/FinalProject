// Firstly, we call twitterService.initialize() to set up the service properly. The function $scope.connectButton() is called when the user clicks on the “Connect Twitter” button. This initiates the authorization process by calling twitterService.connectTwitter(). Upon completion we set $scope.connectedTwitter = true so that the search box and the “Load more” button will be visible on the UI. We set the model rateLimitError on $scope to true when error is encountered.
//
// When a user clicks on the button “Get My Timeline”, the function $scope.refreshTimeline() is called. It retrieves a list of tweets and sets it to the scope model $scope.tweets. As a result Angular’s two way data binding kicks in and ng-repeat automatically refreshes the UI with a list of tweets from the user’s timeline.
//
// Finally, The function $scope.signOut() logs user out of the app and cleans up the tweets.
//
var app = angular.module('twitterApp');

app.controller('TwitterController', ['$scope','$q','twitterService',function($scope, $q, twitterService) {
    $scope.tweets = []; //array of tweets

    twitterService.initialize();

    //using the OAuth authorization result get the latest 20 tweets from twitter for the user
    $scope.refreshTimeline = function(maxId) {
        twitterService.getLatestTweets(maxId).then(function(data) {
            $scope.tweets = $scope.tweets.concat(data);
        }, function() {
            $scope.rateLimitError = true;
        });
    }

    //when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectButton = function() {
        twitterService.connectTwitter().then(function() {
            if (twitterService.isReady()) {
                //if the authorization is successful, hide the connect button and display the tweets
                $('#connectButton').fadeOut(function() {
                    $('#getTimelineButton, #signOut').fadeIn();
                    $scope.refreshTimeline();
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
        $('#getTimelineButton, #signOut').fadeOut(function() {
            $('#connectButton').fadeIn();
            $scope.$apply(function() {
                $scope.connectedTwitter = false
            })
        });
    }

    //if the user is a returning user, hide the sign in button and display the tweets
    if (twitterService.isReady()) {
        $('#connectButton').hide();
        $('#getTimelineButton, #signOut').show();
        $scope.connectedTwitter = true;
        $scope.refreshTimeline();
    }
}]);
