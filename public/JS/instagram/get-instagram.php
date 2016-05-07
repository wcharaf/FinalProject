<?php
$latitude = $_POST["latitude"];
$longitude = $_POST["longitude"];
$radius = $_POST["radius"];

if ($radius == null) {
	$radius = 1000; //= 1km (Max = 5km)
}

if ($latitude == null) {
    echo "You must select a location from the map."; 
    return;
}

if ($longitude == null) {
    echo "You must select a location from the map.";
    return;
}

$consumerkey = "f98147460ba4428e9f09590b3af52b3e";
$consumersecret = "06f77970f60e4c4dad976aa025b3e3c5";
$accesstoken = "2021356797.f981474.83b486d902d540ae964bf4aefdb153c1";

$instagram = file_get_contents("https://api.instagram.com/v1/media/search?lat=".$latitude."&lng=".$longitude."&distance=".$radius."&client_id=".$consumerkey);

echo $instagram;
?>