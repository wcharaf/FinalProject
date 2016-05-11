// var app = angular.module('twitterApp', ['ngSanitize','twitterApp.services']);
var app = angular.module('twitterApp', ['twitterApp.services']);
//
// function loadTweets () {
// 	validateInputs($('input[name="twitter-radius"]'), 1, 1000);
// 	validateInputs($('input[name="notweets"]'), 1, 100);
//
// 	var rad = $('input[name="twitter-radius"]').val(),
// 		notweets = $('input[name="notweets"]').val(),
// 		lat = marker.getPosition().lat(),
//       	lng = marker.getPosition().lng();
//
// 	$.ajax({
// 		type: 'POST',
// 		url: 'js/twitter/get-tweets.php',
// 		data: { latitude: lat, longitude: lng, radius: rad, count: notweets},
// 		success: function(response) {
// 			if (typeof response.errors === 'undefined' || response.errors.length < 1) {
// 				var obj = jQuery.parseJSON(response),
// 					$tweets = '';
// 				console.log("Twitter: ",obj.statuses);
//
// 				if (obj.statuses.length > 0) {
// 					$.each(obj.statuses, function(){
// 				       	var text = this.text,
// 				        	time = new Date(this.created_at).toLocaleString(),
// 				        	name = this.user.name,
// 				        	username = this.user.screen_name,
// 				        	image = this.user.profile_image_url,
// 				        	userColor = this.user.profile_link_color,
// 				        	urls = this.entities.urls, //URLs present on this tweet
// 				        	media = this.entities.media, //media content present on this tweet
// 				        	hashtags = this.entities.hashtags, //hashtags present on this tweet
// 				        	mentions = this.entities.user_mentions, //people mentions present on this tweet
// 				        	newText = '',
// 				        	replacementList = []; //array that will contain all needed replacements for each tweet
//
// 				        //wrap URLs on a link tag
// 				        if (urls) {
// 				        	$.each(urls, function (i) {
// 			        			var textUrl =  urls[i].url,
// 			        				startIndex = urls[i].indices[0],
// 			        				endIndex = urls[i].indices[1];
//
// 			        			//build the new piece of text that will replace the URL and add it to our array
// 			        			newText = "<a target='_blank' style='color: #"+ userColor +"' href='"+ textUrl +"'>" + textUrl + "</a>";
// 			        			replacementList.push({
// 			        				type: "url",
// 			        				start: startIndex,
// 			        				end: endIndex,
// 			        				content: textUrl,
// 			        				text: newText
// 			        			});
// 			        		});
// 				        }
//
// 						//wrap media URLs under the correct tag
// 			        	//Twitter API just include type "photo" for now
// 			        	if (media) {
// 			        		$.each(media, function (i) {
// 			        			var type = media[i].type,
// 			        				textUrl =  media[i].url,
// 			        				startIndex = media[i].indices[0],
// 			        				endIndex = media[i].indices[1];
//
// 			        			if (type === "photo") { //photos will be wrapped in 'img' tag using their small size
// 				        			//get image small dimensions and URL
// 				        			var	mediaWidth = media[i].sizes.small.w,
// 				        				mediaHeigth = media[i].sizes.small.h,
// 				        				mediaUrl = media[i].media_url;
//
// 				        			newText = "<a target='_blank' href='"+ textUrl +"'><img style='display:block;width:"+ mediaWidth +"px;height:"+ mediaHeigth +"px;' src='"+ mediaUrl +"'/></a>";
// 									replacementList.push({
// 										type: "photo",
// 										start: startIndex,
// 			        					end: endIndex,
// 										content: textUrl,
// 										text: newText
// 									});
// 				        		} else { //any other type of media will be treat as a normal URL link
// 			        				newText = "<a target='_blank' style='color: #"+ userColor +"' href='"+ textUrl +"'>" + textUrl + "</a>";
// 			        				replacementList.push({
// 			        					type: "other",
// 			        					start: startIndex,
// 			        					end: endIndex,
// 			        					content: textUrl,
// 			        					text: newText
// 			        				});
// 			        			}
// 			        		});
// 			        	}
//
// 			        	//wrap hashtags under a link tag
// 			        	if (hashtags) {
// 			        		$.each(hashtags, function (i) {
// 			        			var textHashtag = hashtags[i].text,
// 			        				startIndex = hashtags[i].indices[0],
// 			        				endIndex = hashtags[i].indices[1];
//
// 			        			newText = "<a target='_blank' style='color: #"+ userColor +"' href='https://twitter.com/search?q=%23"+ textHashtag +"&src=typd'>#" + textHashtag + "</a>";
// 			        			replacementList.push({
// 			        				type: "hashtag",
// 			        				start: startIndex,
// 			        				end: endIndex,
// 			        				content: '#' + textHashtag,
// 			        				text: newText
// 			        			});
// 			        		});
// 			        	}
//
// 			        	//wrap mentions under a link tag
// 			        	if (mentions) {
// 			        		$.each(mentions, function (i) {
// 			        			var textMention = mentions[i].screen_name,
// 			        				startIndex = mentions[i].indices[0],
// 			        				endIndex = mentions[i].indices[1];
//
// 			        			newText = "<a target='_blank' style='color: #"+ userColor +"' href='https://twitter.com/"+ textMention +"'>@" + textMention + "</a>";
// 			        			replacementList.push({
// 			        				type: "mention",
// 			        				start: startIndex,
// 			        				end: endIndex,
// 			        				content: '@' + textMention,
// 			        				text: newText
// 			        			});
// 			        		});
// 			        	}
//
// 			        	//sort our array 'replacementList' by its starting index values
// 						replacementList = replacementList.sort(function (a, b) { return a.start - b.start; });
//
// 						//Known issue: wrong length and index calculations when the text includes icons
// 						//The replacement will not be as precise as if it didn't have icon(s).
// 						//Twitter API is not having icons in mind and the given indices treat them as length = 1
// 						var indexIncrement = 0;
// 						$.each(replacementList, function (i) {
// 							var replacementText =  replacementList[i].text,
// 		        				//calculate the start and end of the text to replace
// 		        				startIndex = replacementList[i].start + indexIncrement,
// 		        				endIndex = startIndex + replacementList[i].content.length,
// 		        				//text from beginning to the start of the text to replace
// 		        				textStart = text.substring(0, startIndex),
// 		        				//rest of text to the end
// 		        				textEnd = text.substring(endIndex, text.length);
//
// 		        			//build the text again including the new links and elements
// 		        			switch (replacementList[i].type){
// 		        				case 'photo': //photos will go at the end of it
// 		        					text = textStart + textEnd + replacementText;
// 		        				break;
// 		        				default: //the rest of content will get replaced where it is
// 		        					text = textStart + replacementText + textEnd;
// 		        			}
// 		        			//The text has changed so the index will need to update
// 		        			indexIncrement += (replacementText.length - replacementList[i].content.length);
// 						});
//
// 						//Build final content per tweet which will be included in the page
// 				        $tweets += "<div class='contentBox tweets' style='border: 4px solid #"+ userColor +"'>";
// 				        $tweets += "<a target='_blank' style='color: #"+ userColor +"' href='https://twitter.com/" + username + "'><img class='avatar' src='" + image + "'/></a>";
// 				        $tweets += "<div class='content'><strong class='fullname'>" + name + "</strong><span class='username'><a target='_blank' href='https://twitter.com/" + username + "'>@" + username + "</a></span><small class='time'>" + time + "</small>";
// 			        	$tweets += "<br><p class='text'>" + text + "<p></div>";
// 			        	$tweets += "</div>";
// 			    	});
// 				} else { //no results
// 					$tweets = "<p>Sorry but there's no tweets available for the current location.<p>";
// 				}
//
// 				$('.tweets-container').html($tweets);
// 			} else {
// 				$('.tweets-container p:first').text('Response error');
// 			}
// 		},
// 		error: function(errors) {
// 			$('.tweets-container p:first').text('Request error');
// 		}
// 	});
// }
//
// $('button[name="twitter_apply_changes"]').click(function () {
//     loadTweets();
// });
