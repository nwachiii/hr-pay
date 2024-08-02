$(document).ready(function () {
	$('#signupForm').on('submit', function (event) {
		event.preventDefault();
		if (this.checkValidity() === false) {
			event.stopPropagation();
		} else {
			const name = $('#signupName').val();
			const email = $('#signupEmail').val();
			const password = $('#signupPassword').val();

			if (!validateEmail(email)) {
				$('#loginEmail').addClass('is-invalid');
				return;
			} else {
				$('#loginEmail').removeClass('is-invalid').addClass('is-valid');
			}

			const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
			const namePattern = /^[a-zA-Z\s]+$/;

			if (!passwordPattern.test(password)) {
				$('#signupPassword').addClass('is-invalid');
				return;
			} else {
				$('#signupPassword').removeClass('is-invalid').addClass('is-valid');
			}

			if (!namePattern.test(name)) {
				$('#signupName').addClass('is-invalid');
				return;
			} else {
				$('#signupName').removeClass('is-invalid').addClass('is-valid');
			}
			if (!validateEmail(email)) {
				$('#signupEmail').addClass('is-invalid');
				return;
			} else {
				$('#signupEmail').removeClass('is-invalid').addClass('is-valid');
            }
            
			console.log(name, email, password);

			$.ajax({
				url: '/backend/signup', // Replace with your backend sign-up endpoint
				type: 'POST',
				data: {name, email, password},
				success: function (response) {
					$('#signupMessage').text(response.message).removeClass('text-danger').addClass('text-success');
				},
				error: function (xhr) {
					$('#signupMessage').text(xhr.responseJSON.message).removeClass('text-success').addClass('text-danger');
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
