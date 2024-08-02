$(document).ready(function () {
	$('body').addClass('fade-in');

	$('a').on('click', function (event) {
		event.preventDefault();
		var linkLocation = this.href;
		$('body').removeClass('fade-in').addClass('fade-out');
		setTimeout(function () {
			window.location = linkLocation;
		}, 500);
	});
});
