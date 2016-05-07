function loadInstagram() {

  // see http://diveintohtml5.info/geolocation.html

  navigator.geolocation.getCurrentPosition(function (position) {
				flat = marker.getPosition().lat(),
      	lng = marker.getPosition().lng();

    // see http://instagram.com/developer/endpoints/media/#get_media_search

    $.ajax({
      url: "https://api.instagram.com/v1/media/search",
      data: {
        lat: lat,
        lng: lng,
        client_id: "fa639a7c4cc347bf8827cc5d53145ea0"
      },
      dataType: "jsonp",
      jsonp: "callback"
    }).done(function (data) {
      for (var i in data.data) {
        var url = data.data[i].images.low_resolution.url;
        $("#images").append(
          $("<img>").attr("src", url)
        );
      }
    }).fail(function (err) {
      alert(err);
    });
  });
};

//
// function loadInstagram () {
// 	validateInputs($('input[name="instagram-radius"]'), 1, 5);
//
// 	var rad = $('input[name="instagram-radius"]').val() * 1000,
// 		lat = marker.getPosition().lat(),
//       	lng = marker.getPosition().lng();
//
// 	$.ajax({
// 		type: 'POST',
// 		url: 'js/instagram/get-instagram.php',
// 		data: { latitude: lat, longitude: lng, radius: rad},
// 		success: function(response) {
// 			if (typeof response.errors === 'undefined' || response.errors.length < 1) {
// 				var obj = jQuery.parseJSON(response),
// 					$instagram = '';
// 					console.log("Instagram: ", obj.data);
//
// 				//if we get a response, loop through every object to show its data
// 				if (obj.data.length > 0) {
// 					$.each(obj.data, function(){
// 						var text = this.caption ? this.caption.text : "",
// 				        	time = new Date(parseInt(this.created_time) * 1000).toLocaleString(),
// 				        	name = this.user.full_name,
// 				        	username = this.user.username,
// 				        	profile_picture = this.user.profile_picture,
// 				        	image = this.images.low_resolution.url,
// 				        	image_height = this.images.low_resolution.height,
// 				        	image_width = this.images.low_resolution.width,
// 				        	image_filter = this.filter,
// 				        	url = this.link,
// 				        	location = this.location.name,
// 				        	tags = this.tags;
//
// 				        //if no location name we don't show it, if some add separator '||'
// 				        if (!location) {
// 				        	location = "";
// 				        } else {
// 				        	location += " || ";
// 				        }
//
// 				        //wrap instagram tags on a link
// 				        if (tags) {
// 				        	$.each(tags, function (i) {
// 				        		//pass the whole text to lower case and search for the tag word
// 								var lowerCaseText = text.toLowerCase(),
// 				        			newTagText = "<a target='_blank' href='https://instagram.com/explore/tags/"+ tags[i] +"'>#"+ tags[i] +"</a>",
// 				        			index = lowerCaseText.indexOf('#'+ tags[i] + " ");
//
// 				        		//we search for '#word ' including a space at the end ensures we got the tag correctly
// 				        		//if not found it could potentially be because it is the latest word on the text
// 				        		//... so it doesn't have an space after it, retry without space
// 				        		if (index === -1) {
// 				        			index = lowerCaseText.indexOf('#'+ tags[i]);
// 				        			//if still nothing then return
// 				        			if (index === -1) {
// 				        				return;
// 				        			}
// 				        		}
//
// 				        		var length = tags[i].length,
// 				        			total = index + length + 1,
// 				        			start = lowerCaseText.slice(0, index),
// 				        			end = lowerCaseText.slice(total, lowerCaseText.length);
//
// 				        		//build the text again with the new links included on it
// 				        		text = start + newTagText + end;
// 			        		});
// 				        }
//
// 				        //Build final instagram content which will be included in the page
// 				        $instagram += "<div class='contentBox instagrams'>";
// 				        $instagram += "<a target='_blank' href='https://instagram.com/" + username + "'><img class='avatar' src='" + profile_picture + "'/></a>";
// 				        $instagram += "<div class='content'><strong class='fullname'>" + name + "</strong><span class='username'><a target='_blank' href='https://instagram.com/" + username + "'>" + username + "</a></span><small class='time'>"+ location + time + "</small>";
// 			        	$instagram += "<br><p class='text'>" + text + "<p>";
// 			        	$instagram += "<a target='_blank' href='"+ url +"'><img src='"+ image +"' width='"+ image_width +"px' height='"+ image_height +"px'/></a>";
// 			        	$instagram += "</div></div>";
// 			    	});
// 				} else { //no results
// 					$instagram = "<p>Sorry but there's no instagram content available for the current location.<p>";
// 				}
//
// 				$('.instagram-container').html($instagram);
// 			} else {
// 				$('.instagram-container p:first').text('Response error');
// 			}
// 		},
// 		error: function(errors) {
// 			$('.instagram-container p:first').text('Request error');
// 		}
// 	});
// }
//
// $('button[name="instagram_apply_changes"]').click(function () {
//     loadInstagram();
// });
