<?php
$latitude = $_POST["latitude"];
$longitude = $_POST["longitude"];
$radius = $_POST["radius"];
$maxvideos = $_POST["count"];

if ($radius == null) {
	$radius = 1;
}

if ($maxvideos == null) {
	$maxvideos = 5;
}

if ($latitude == null) {
    echo "You must select a location from the map."; 
    return;
}

if ($longitude == null) {
    echo "You must select a location from the map.";
    return;
}

$consumerkey = "AIzaSyAp1l74ViMKN3b76K-2kJjDrbIjMlwNYVo";

$youtube = file_get_contents("https://www.googleapis.com/youtube/v3/search?locationRadius=".$radius."km&order=date&part=snippet&location=".$latitude."%2C+".$longitude."&type=video%2Clist&maxResults=".$maxvideos."&key=".$consumerkey);

echo $youtube;
?>