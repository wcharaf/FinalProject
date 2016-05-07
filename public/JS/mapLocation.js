// Note: In order to load the map starting on your current location you need to consent
//location sharing when prompted by your browser. If not then it will default to Detroit.
var map, marker;

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
    marker.setPosition(pos);
    loadTabContent();
  });

  //First load of content on initialization, try to load the user preference
  userPreference();

  //center map in marker position
  map.setCenter(pos);
}

google.maps.event.addDomListener(window, 'load', initialize);
