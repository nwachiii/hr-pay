$(document).ready(function () {
	$('#forgotPasswordForm').on('submit', function (event) {
		event.preventDefault();
		if (this.checkValidity() === false) {
			event.stopPropagation();
		} else {
			const email = $('#forgotPasswordEmail').val();

			if (!validateEmail(email)) {
				$('#forgotPasswordEmail').addClass('is-invalid');
				return;
			} else {
				$('#forgotPasswordEmail').removeClass('is-invalid').addClass('is-valid');
			}

			console.log(email);

			$.ajax({
				url: '/backend/forgot_password', // Replace with your backend forgot password endpoint
				type: 'POST',
				data: {email},
				success: function (response) {
					$('#forgotPasswordMessage').text(response.message).removeClass('text-danger').addClass('text-success');
				},
				error: function (xhr) {
					$('#forgotPasswordMessage').text(xhr.responseJSON.message).removeClass('text-success').addClass('text-danger');
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
