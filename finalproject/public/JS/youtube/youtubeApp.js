// var app = angular.module('twitterApp', ['twitterApp.services']);
// function loadYoutube () {
// 	validateInputs($('input[name="youtube-radius"]'), 1, 1000); //1 - 1000 km
// 	validateInputs($('input[name="maxVideos"]'), 1, 50);
//
// 	var rad = $('input[name="youtube-radius"]').val(),
// 		noVideos = $('input[name="maxVideos"]').val(),
// 		lat = marker.getPosition().lat(),
//       	lng = marker.getPosition().lng();
//
// 	$.ajax({
// 		type: 'POST',
// 		url: 'js/youtube/get-youtube.php',
// 		data: { latitude: lat, longitude: lng, radius: rad, count: noVideos},
// 		success: function(response) {
// 			if (typeof response.errors === 'undefined' || response.errors.length < 1) {
// 				var obj = jQuery.parseJSON(response),
// 					$youtube = '';
// 					console.log("Youtube: ", obj.items);
//
// 				//if we get a response, loop through every object to show its data
// 				if (obj.items.length > 0) {
// 					$.each(obj.items, function(){
// 						var videoId = this.id.videoId;
//
// 						//Build final instagram content which will be included in the page
// 						$youtube += "<div class='contentBox youtube_videos'>";
// 					 	$youtube += "<iframe width='420' height='345' src='http://www.youtube.com/embed/"+ videoId +"'></iframe>";
// 						$youtube += "</div>";
// 			    	});
// 				} else { //no results
// 					$youtube = "<p>Sorry but there's no youtube videos available for the current location.<p>";
// 				}
//
// 				$('.youtube-container').html($youtube);
// 			} else {
// 				$('.youtube-container p:first').text('Response error');
// 			}
// 		},
// 		error: function(errors) {
// 			$('.youtube-container p:first').text('Request error');
// 		}
// 	});
// }
//
// $('button[name="youtube_apply_changes"]').click(function () {
//     loadYoutube();
// });
