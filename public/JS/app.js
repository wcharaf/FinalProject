function validateInputs (input, min, max) {
	$(input).parent().children('.error').css('display','none');
	if (input.val() > max) {
		$(input).parent().children('.error').css('display','inline-block');
		input.val(max);
	} else if (input.val() < min) {
		$(input).parent().children('.error').css('display','inline-block');
		input.val(min);
	}
}

//Load the content for the selected tab only
function loadTabContent () {
	var $selectedTab = $('.tabs-menu li.current a');

	if ($selectedTab.length > 0) {
		if ($selectedTab.attr("href").indexOf('twitter') > 0) {
			loadTweets();
			$('#twitter-tab').css('display','block');
	    } else if ($selectedTab.attr("href").indexOf('instagram') > 0) {
			loadInstagram();
			$('#instagram-tab').css('display','block');
	    } else if ($selectedTab.attr("href").indexOf('youtube') > 0) {
	    	loadYoutube();
	    	$('#youtube-tab').css('display','block');
	    }
	}
}

//Save the user preference on LocalStorage
function saveUserPreference (value) {
	localStorage.setItem("startContent", value);
}

//Load user preference first, force the prefered content to show on load
function userPreference () {
	var preference = localStorage.getItem("startContent");

	switch (preference) {
		case 'twitter':
			$('.tabs-menu a[href="#twitter-tab"]').click();
			break;
		case 'instagram':
			$('.tabs-menu a[href="#instagram-tab"]').click();
			break;
		case 'youtube':
			$('.tabs-menu a[href="#youtube-tab"]').click();
			break;
		default:
			$('.tabs-menu a[href="#twitter-tab"]').click();
			break;
	}
}

//Check or uncheck the default tab checkbox based on user preference
function markPreferenceBox (tab) {
	var preference = localStorage.getItem("startContent");

	switch (preference) {
		case 'twitter':
			if (tab === '#twitter-tab') {
				$('input[type="checkbox"][name="twitter"]').prop('checked', true);
			} else {
				$('input[type="checkbox"][name="twitter"]').prop('checked', false);
			}
			break;
		case 'instagram':
			if (tab === '#instagram-tab') {
				$('input[type="checkbox"][name="instagram"]').prop('checked', true);
			} else {
				$('input[type="checkbox"][name="instagram"]').prop('checked', false);
			}
			break;
		case 'youtube':
			if (tab === '#youtube-tab') {
				$('input[type="checkbox"][name="youtube"]').prop('checked', true);
			} else {
				$('input[type="checkbox"][name="youtube"]').prop('checked', false);
			}
			break;
		default:
			if (tab === '#twitter-tab') {
				$('input[type="checkbox"][name="twitter"]').prop('checked', true);
			} else {
				$('input[type="checkbox"][name="twitter"]').prop('checked', false);
			}
			break;
	}
}

$(document).ajaxStart(function(){
	$(".loading-overlay").css("display", "block");
	$('.tab').addClass('loading-overlay');
	$('.tab').css('pointer-events', 'none');
	$('.tab-content').css('opacity', 0.4);
});

$(document).ajaxComplete(function(){
	$('.tab').removeClass('loading-overlay');
	$(".loading-overlay").css("display", "none");
	$('.tab').css('pointer-events', 'auto');
	$('.tab-content').css('opacity', 1);
});

$(document).ready(function () {
	$('.arrow-top').click(function () {
		$('html, body').stop().animate({
	       scrollTop: $('header').offset().top
	    }, 1000);
	});

	$(".tabs-menu a").click(function (e) {
	    e.preventDefault();
	    $(this).parent().addClass("current");
	    $(this).parent().siblings().removeClass("current");
	    var tab = $(this).attr("href");
	    $(".tab-content").not(tab).css("display", "none");
		$(tab).fadeIn();
		markPreferenceBox(tab);
	    loadTabContent();
	});
});
