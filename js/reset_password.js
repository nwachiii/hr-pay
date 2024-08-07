$(document).ready(function () {
	// Toggle password visibility
	$('#toggleNewPassword').click(function () {
		const passwordField = $('#resetPassword');
		const passwordFieldType = passwordField.attr('type');
		const confirmPasswordField = $('#confirmPassword');

		if (passwordFieldType === 'password') {
			passwordField.attr('type', 'text');
			confirmPasswordField.attr('type', 'text');
			$('#eyeIcon').removeClass('fa-eye').addClass('fa-eye-slash');
		} else {
			passwordField.attr('type', 'password');
			confirmPasswordField.attr('type', 'password');
			$('#eyeIcon').removeClass('fa-eye-slash').addClass('fa-eye');
		}
	});

	// Validate the form
	$('#resetForm').on('submit', function (event) {
		event.preventDefault();
		const password = $('#resetPassword').val();
		const confirmPassword = $('#confirmPassword').val();
		const errorMessage = $('#errorMessage');

		// Clear previous error message
		errorMessage.text('');

		if (password !== confirmPassword) {
			errorMessage.text('Passwords do not match.');
			$('#confirmPassword').addClass('is-invalid');
			return;
		} else {
			$('#confirmPassword').removeClass('is-invalid').addClass('is-valid');
		}

		const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

		if (!passwordPattern.test(password)) {
			errorMessage.text('Password must be at least 8 characters, contain an uppercase letter, a lowercase letter, a number, and a special character.');
			$('#resetPassword').addClass('is-invalid');
			return;
		} else {
			$('#resetPassword').removeClass('is-invalid').addClass('is-valid');
		}

		// If validation passes, you can proceed with form submission (e.g., via AJAX)
		console.log('Form is valid and ready for submission');
	});
});
