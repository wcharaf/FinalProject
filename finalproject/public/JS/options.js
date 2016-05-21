var myApp = angular.module('myApp');

myApp.factory("Options", function (){
  var newradnum = [];
     return {
		     getData: function(rad,num){
			        newradnum = [rad,num];
		          },
		     sendData: function (){
			      return newradnum;
		        }
	         };

});
