angular.module('twitterApp.services', [])
.factory('twitterService', function($q) {

    var authorizationResult = false;

    return {
        initialize: function() {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('TvYz0Zr26DhMI7iwKWzrs08cmhI', {
                cache: true
            });
            //try to create an authorization result when the page loads,
            // this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create("twitter");
        },
        isReady: function() {
            return (authorizationResult);
        },
        // The most important functions in the above snippet are connectTwitter() and getLatestTweets(). The former is used to connect a user with Twitter, while the later fetches the latest tweets from the user’s timeline.
        //
        connectTwitter: function() {
            var deferred = $q.defer();
            // As you can see, the method OAuth.popup() is used to trigger a popup that asks the users to connect with their Twitter account. If the operation is successful we resolve the promise by calling deferred.resolve(). In case of error we reject the promise and pass the error object to the resolve function.
            OAuth.popup("twitter", {
                cache: true
            }, function(error, result) {
                // cache means to execute the callback if the tokens are already present
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
        // Similarly, the function getLatestTweets() makes a call to the API endpoint /1.1/statuses/home_timeline.json to obtain a list of tweets. Once the operation is successful we resolve the promise.
        getLatestTweets: function(maxId) {
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
            var url = '/1.1/statuses/home_timeline.json';
            if (maxId) {
                url += '?max_id=' + maxId;
            }
            var promise = authorizationResult.get(url).done(function(data) {
                // https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                // when the data is retrieved resolve the deferred object
                deferred.resolve(data);
            }).fail(function(err) {
                deferred.reject(err);
            });
            //return the promise of the deferred object
            return deferred.promise;
        }
    }
});
