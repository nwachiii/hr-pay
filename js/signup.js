$(document).ready(function () {
	$('#signupForm').on('submit', function (event) {
		event.preventDefault();
		if (this.checkValidity() === false) {
			event.stopPropagation();
		} else {
			const firstName = $('#firstName').val();
			const lastName = $('#lastName').val();
			const email = $('#signupEmail').val();
			const phone = $('#phoneNumber').val();
			const countryCode = $('#countryCode').val();
			const password = $('#signupPassword').val();
			const confirmPassword = $('#confirmPassword').val();
			const companyName = $('#companyName').val();
			const companyAddress = $('#companyAddress').val();
			const state = $('#state').val();
			const zipcode = $('#zipcode').val();
			const country = $('#country').val();
			const role = $('#role').val();
			const cardNumber = $('#cardNumber').val();
			const cardName = $('#cardName').val();
			const expiryDate = $('#expiryDate').val();
			const cvv = $('#cvv').val();

			if (!validateEmail(email)) {
				$('#signupEmail').addClass('is-invalid');
				return;
			} else {
				$('#signupEmail').removeClass('is-invalid').addClass('is-valid');
			}

			if (!validatePhone(phone)) {
				$('#phoneNumber').addClass('is-invalid');
				return;
			} else {
				$('#phoneNumber').removeClass('is-invalid').addClass('is-valid');
			}

			const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

			if (!passwordPattern.test(password)) {
				$('#signupPassword').addClass('is-invalid');
				return;
			} else {
				$('#signupPassword').removeClass('is-invalid').addClass('is-valid');
			}

			if (password !== confirmPassword) {
				$('#confirmPassword').addClass('is-invalid');
				$('#confirmPassword')[0].setCustomValidity('Passwords do not match');
				return;
			} else {
				$('#confirmPassword').removeClass('is-invalid').addClass('is-valid');
				$('#confirmPassword')[0].setCustomValidity('');
			}

			console.log(firstName, lastName, email, countryCode + phone, password, companyName, companyAddress, state, zipcode, country, role, cardNumber, cardName, expiryDate, cvv);

			$.ajax({
				url: '/backend/signup', // Replace with your backend sign-up endpoint
				type: 'POST',
				data: {
					firstName,
					lastName,
					email,
					phone: countryCode + phone,
					password,
					companyName,
					companyAddress,
					state,
					zipcode,
					country,
					role,
					cardNumber,
					cardName,
					expiryDate,
					cvv,
				},
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

	$('#nextBtn').click(function () {
		if ($('#firstName').val() === '' || $('#lastName').val() === '' || $('#signupEmail').val() === '' || $('#signupPassword').val() === '' || $('#confirmPassword').val() === '' || $('#signupPassword').val() !== $('#confirmPassword').val()) {
			$('#signupForm')[0].reportValidity();
		} else {
			$('#userInfo').hide();
			$('#paymentInfo').show();
		}
	});

	$('#prevBtn').click(function () {
		$('#paymentInfo').hide();
		$('#userInfo').show();
	});

	$('#togglePassword').click(function () {
		const passwordField = $('#signupPassword');
		const confirmPasswordField = $('#confirmPassword');
		const passwordFieldType = passwordField.attr('type');
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

	function validateEmail(email) {
		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		return emailPattern.test(email);
	}

	function validatePhone(phone) {
		const phonePattern = /^\d{10}$/;
		return phonePattern.test(phone);
	}
});
