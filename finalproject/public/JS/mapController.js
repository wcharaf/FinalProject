
// Note: In order to load the map starting on your current location you need to consent
//location sharing when prompted by your browser. If not then it will default to Detroit.


var app = angular.module('myApp');

app.controller('mapController', function($scope,Options,Coordinates){

var map, marker;
// var newlatitude= 42.3314285278;
// var newlongitude= -83.0457534790;

function initialize() {
  var mapOptions = {
    zoom: 10
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      setMap(position.coords.latitude, position.coords.longitude);
    }, function() {
      //Geolocation service failed. Default to Detroit
      setMap(42.3314285278,-83.0457534790);
    });
  } else { //Browser doesn't support Geolocation. Default to Detroit
    setMap(42.3314285278,-83.0457534790);
  }
}

//set and center map based on a given latitude and longitude values
function setMap (latitude, longitude) {
  var pos = new google.maps.LatLng(latitude, longitude);
  // Place a draggable marker on the map
  marker = new google.maps.Marker({
      map: map,
      position: pos,
      draggable:true,
      title:"Drag me!"
  });

  //Add event listener when releasing the marker so it loads the content of that area
  google.maps.event.addListener(marker, 'mouseup', loadTabContent);
  //Right mouse click will change marker position to mouse position and load the content
  google.maps.event.addListener(map, "click", function(event) {
    var pos = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
    console.log(pos);
    marker.setPosition(pos);
    newlatitude=pos.lat();
    console.log(newlatitude);
    newlongitude=pos.lng();
    console.log(newlongitude);
    loadTabContent();
    Coordinates.getData(newlatitude,newlongitude);
  });

// console.log($scope.radius);

  //First load of content on initialization, try to load the user preference
  userPreference();

  //center map in marker position
  map.setCenter(pos);
}

google.maps.event.addDomListener(window, 'load', initialize);

$scope.myOptions = function(radius,numofresult) {
  var newradius = radius;
  console.log(newradius);
  var newnumofresults= numofresult;
  console.log(newnumofresults);
  Options.getData(newradius,newnumofresults);
}
});
