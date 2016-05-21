// var app = angular.module('myApp', ['ngSanitize','myApp.twitterService']);

var myApp = angular.module('myApp');


myApp.factory("Coordinates", function(){
	var newlatlong = [];
	return {
		getData: function(nlat,nlon){
			newlatlong = [nlat,nlon];
		},
		sendData: function(){
			return newlatlong;
		}
	};
});
