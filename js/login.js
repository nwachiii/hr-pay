$(document).ready(function () {
	$('#loginForm').on('submit', function (event) {
		event.preventDefault();
		if (this.checkValidity() === false) {
			event.stopPropagation();
		} else {
			const email = $('#loginEmail').val();
			const password = $('#loginPassword').val();
			console.log(email, password);
			if (!validateEmail(email)) {
				$('#loginEmail').addClass('is-invalid');
				return;
			} else {
				$('#loginEmail').removeClass('is-invalid').addClass('is-valid');
			}
			$.ajax({
				url: '/backend/login', // Replace with your backend login endpoint
				type: 'POST',
				data: {email, password},
				success: function (response) {
					$('#loginMessage').text(response.message).removeClass('text-danger').addClass('text-success');
				},
				error: function (xhr) {
					$('#loginMessage').text(xhr.responseJSON.message).removeClass('text-success').addClass('text-danger');
				},
			});
		}
		$(this).addClass('was-validated');
	});

	function validateEmail(email) {
		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		return emailPattern.test(email);
	}
});
