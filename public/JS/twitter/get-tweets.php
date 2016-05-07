<?php
$latitude = $_POST["latitude"];
$longitude = $_POST["longitude"];
$radius = $_POST["radius"];
$notweets = $_POST["count"];

if ($radius == null) {
	$radius = 1;
}

if ($notweets == null) {
	$notweets = 15;
}

if ($latitude == null) {
    echo "You must select a location from the map."; 
    return;
}

if ($longitude == null) {
    echo "You must select a location from the map.";
    return;
}

session_start();
require_once("C:/wamp/www/TwitterApp/libs/twitteroauth-master/twitteroauth/twitteroauth.php"); //Path to twitteroauth library

$consumerkey = "aa2GFaxXYPpsEO8qGLveZIvUr";
$consumersecret = "IbcvvscWiWggiEF8oJNb2eY1PsokAaYvcnwHWtv5Opx6n2Ij1o";
$accesstoken = "189608045-fuGG2y85ZNmoieF0QKvdAJLFHFtoojBqoDCtXIHM";
$accesstokensecret = "rNwROk6Dvh4ci4UOnQh7TuDg3u19OYHcfKjjiRcguIiOz";

function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
 
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
$tweets = $connection->get("https://api.twitter.com/1.1/search/tweets.json?q=&geocode=".$latitude.",".$longitude.",".$radius."km&count=".$notweets);

echo json_encode($tweets);
?>