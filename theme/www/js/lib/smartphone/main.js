var content = document.querySelector('#content');
var overlay = document.querySelector('#overlay');
var div_banner = document.querySelector("#Animated");

// OVERLAY
overlay.style.opacity = 1;

// cookie-cookie?
var cookie_button = document.querySelector('.cookie-button');

cookie_button.addEventListener("click", function() {

	window.localStorage.cookie_accept = true;
	overlay.style.display = 'none';
	content.style.filter = 'none';
	div_banner.style.filter = 'none';

});
