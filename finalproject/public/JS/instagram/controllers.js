var app = angular.module('myApp');
// var app = angular.module('myApp', ['ngSanitize','myApp.services', 'Coordinates']);
//inject the twitterService into the controller
app.controller('IGController', function($scope,$q, IGService, Coordinates) {


  function loadInstagram() {

    // see http://diveintohtml5.info/geolocation.html

    navigator.geolocation.getCurrentPosition(function (position) {
  				flat = marker.getPosition().lat(),
        	lng = marker.getPosition().lng();

      // see http://instagram.com/developer/endpoints/media/#get_media_search

      $.ajax({
        url: "https://api.instagram.com/v1/media/search",
        data: {
          lat: lat,
          lng: lng,
          client_id: "fa639a7c4cc347bf8827cc5d53145ea0"
        },
        dataType: "jsonp",
        jsonp: "callback"
      }).done(function (data) {
        for (var i in data.data) {
          var url = data.data[i].images.low_resolution.url;
          $("#images").append(
            $("<img>").attr("src", url)
          );
        }
      }).fail(function (err) {
        alert(err);
      });
    });
  };








// SIMILAR TO TWITTER
    $scope.ig=[]; //array of instagram photos

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
