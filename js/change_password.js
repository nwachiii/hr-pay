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

			// $('#toggleOldPassword').click(function () {
			// 	const oldpasswordField = $('#signupPassword');
			// 	const confirmoldPasswordField = $('#confirmPassword');
			// 	const oldpasswordFieldType = oldpasswordField.attr('type');
			// 	if (oldpasswordFieldType === 'password') {
			// 		oldpasswordField.attr('type', 'text');
			// 		confirmoldPasswordField.attr('type', 'text');
			// 		$('#eyeIcon').removeClass('fa-eye').addClass('fa-eye-slash');
			// 	} else {
			// 		oldpasswordField.attr('type', 'password');
			// 		confirmoldPasswordField.attr('type', 'password');
			// 		$('#eyeIcon').removeClass('fa-eye-slash').addClass('fa-eye');
			// 	}
			// });

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

	$('#toggleOldPassword').click(function () {
		const oldPasswordField = $('#oldPassword');
		const oldPasswordFieldType = oldPasswordField.attr('type');
		if (oldPasswordFieldType === 'password') {
			oldPasswordField.attr('type', 'text');
			$('#eyeIcon').removeClass('fa-eye').addClass('fa-eye-slash');
		} else {
			oldPasswordField.attr('type', 'password');
			$('#eyeIcon').removeClass('fa-eye-slash').addClass('fa-eye');
		}
	});
	$('#toggleNewPassword').click(function () {
		const newPasswordField = $('#resetPassword');
		const confirmNewPasswordField = $('#confirmPassword');
		const newPasswordFieldType = newPasswordField.attr('type');
		if (newPasswordFieldType === 'password') {
			newPasswordField.attr('type', 'text');
			confirmNewPasswordField.attr('type', 'text');
			$('#eyeIcon').removeClass('fa-eye').addClass('fa-eye-slash');
		} else {
			newPasswordField.attr('type', 'password');
			confirmNewPasswordField.attr('type', 'password');
			$('#eyeIcon').removeClass('fa-eye-slash').addClass('fa-eye');
		}
	});

	function validatePassword(password) {
		const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
		return passwordPattern.test(password);
	}
});
