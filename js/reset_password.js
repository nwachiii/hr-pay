$(document).ready(function () {
	$('#resetPasswordForm').on('submit', function (event) {
		event.preventDefault();
		if (this.checkValidity() === false) {
			event.stopPropagation();
		} else {
			const newPassword = $('#resetPassword').val();
			const confirmPassword = $('#confirmPassword').val();

			if (!validatePassword(newPassword)) {
				$('#resetPassword').addClass('is-invalid');
				return;
			} else {
				$('#resetPassword').removeClass('is-invalid').addClass('is-valid');
			}

			if (newPassword !== confirmPassword) {
				$('#confirmPassword').addClass('is-invalid');
				return;
			} else {
				$('#confirmPassword').removeClass('is-invalid').addClass('is-valid');
			}

			console.log(newPassword);

			$.ajax({
				url: '/backend/reset_password', // Replace with your backend reset password endpoint
				type: 'POST',
				data: {newPassword},
				success: function (response) {
					$('#resetPasswordMessage').text(response.message).removeClass('text-danger').addClass('text-success');
				},
				error: function (xhr) {
					$('#resetPasswordMessage').text(xhr.responseJSON.message).removeClass('text-success').addClass('text-danger');
				},
			});
		}
		$(this).addClass('was-validated');
	});

	function validatePassword(password) {
		const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
		return passwordPattern.test(password);
	}
});
