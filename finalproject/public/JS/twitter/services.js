var myApp = angular.module('myApp');

myApp.factory('twitterService', function($q, Options, Coordinates) {

    var authorizationResult = false;


    return {
        initialize: function() {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('TvYz0Zr26DhMI7iwKWzrs08cmhI', {cache:true});
            //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create('twitter');
            console.log(authorizationResult);
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup('twitter', {cache:true}, function(error, result) { //cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error

                }
            });
            return deferred.promise;
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        getLatestTweets: function (maxId) {
            //create a deferred object using Angular's $q service
            var newlat= 42.3314285278;
            var newlong= -83.0457534790;
            var newll=Coordinates.sendData();
            console.log(newll);
            if(newll.length > 0) {
              newlat=newll[0];
              newlong=newll[1];
            };

            var newrad = 5;
            var newnum = 20;
            console.log(newradnum);
            var newradnum= Options.sendData();
            console.log(newradnum);

            if(newradnum[0]) {
            newrad=newradnum[0];
          };
            if(newradnum[1]) {
            newnum=newradnum[1];
          };
          console.log(newradnum);


            var deferred = $q.defer();
            // var maxId='place%3A247f43d441defc03';
            // var maxId= '&geocode%3D42.3359244%2c-83.0519076%2c5mi%26result%5Ftype%3Drecent';
            var maxId='&geocode=' + newlat.toString() + ',' + newlong.toString() + ',' + newrad.toString() + 'mi&count='+ newnum.toString();
            // var maxId='&geocode=33.271138,35.1995599,5mi&result_type=recent';
            // var maxId = 'Detroit'
            // var maxId = 'near%3A"Detroit%2C%20MI"%20within%3A15mi&src=typd';
      			// var url='/1.1/statuses/home_timeline.json';
          //  var url='/1.1/geo/search.json';
          //  var url='/1.1/statuses/show.json';
          var url='/1.1/search/tweets.json';
      			if(maxId){
      				// url+='?query='+maxId;
              url+='?q='+maxId;
              console.log(url);


      			}
            var promise = authorizationResult.get(url).done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                //when the data is retrieved resolve the deferred object
                // console.log(promise);
                // console.log(data);
                data=data.statuses;
                // data=data.responseJSON;
                console.log(data);
                // data=data.result;
                // console.log(data);
                // data=data.result.places;
                // // console.log(data);
				        deferred.resolve(data);
            }).fail(function(err) {
               //in case of any error we reject the promise with the error object
                deferred.reject(err);
                });
            //return the promise of the deferred object
            console.log(deferred.promise);
            return deferred.promise;
        }
    }



});
