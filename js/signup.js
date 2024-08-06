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

	// phone number validation
	//   const phoneInput = document.getElementById('phoneNumber');
	// 	phoneInput.addEventListener('input', function () {
	// 		if (this.value.length > 10) {
	// 			this.value = this.value.slice(0, 10);
	// 		}
	// 	});
	
	  const phoneNumberInput = document.getElementById('phoneNumber');
		const countryCodeSelect = document.getElementById('countryCode');
		const invalidFeedback = document.querySelector('.invalid-feedback');

		phoneNumberInput.addEventListener('input', function () {
			const phoneNumber = this.value.replace(/\D/g, ''); // Remove non-numeric characters
			if (phoneNumber.length !== 10) {
				this.classList.add('invalid');
				invalidFeedback.style.display = 'block';
			} else {
				this.classList.remove('invalid');
				invalidFeedback.style.display = 'none';
			}
		});

		countryCodeSelect.addEventListener('change', function () {
			phoneNumberInput.focus();
		});


	// CVV format
	  const cvvInput = document.getElementById('cvv');
		cvvInput.addEventListener('input', function () {
			if (this.value.length > 3) {
				this.value = this.value.slice(0, 3);
			}
		});
});
