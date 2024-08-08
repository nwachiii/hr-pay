$(document).ready(function () {
	$('#signupForm').on('submit', function (event) {
		event.preventDefault();
		if (this.checkValidity() === false) {
			event.stopPropagation();
		} else {
			const state = $('#state').val();
			const zipcode = $('#zipcode').val();
			const lastName = $('#lastName').val();
			const email = $('#signupEmail').val();
			const phone = $('#phoneNumber').val();
			const firstName = $('#firstName').val();
			const companyName = $('#companyName').val();
			const countryCode = $('#countryCode').val();
			const password = $('#signupPassword').val();
			const companyAddress = $('#companyAddress').val();
			const confirmPassword = $('#confirmPassword').val();
			const country = $('#country').val();
			const city = $('#city').val();
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

			console.log(firstName, lastName, email, countryCode + phone, password, companyName, companyAddress, state, zipcode, country, city, cardNumber, cardName, expiryDate, cvv);

			$.ajax({
				url: '/backend/signup', // Replace with backend sign-up endpoint
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
					city,
					// role,
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

	const countryStateMap = {
		USA: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
		Canada: ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'],
		Australia: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Northern Territory', 'Australian Capital Territory'],
		UK: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
		Nigeria: ['Abia', 'Abuja', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'],
		India: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'],
		Brazil: ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'],
		Germany: ['Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hesse', 'Lower Saxony', 'Mecklenburg-Vorpommern', 'North Rhine-Westphalia', 'Rhineland-Palatinate', 'Saarland', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia'],
		France: ['Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Brittany', 'Centre-Val de Loire', 'Corsica', 'Grand Est', 'Hauts-de-France', 'Île-de-France', 'Normandy', 'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire', "Provence-Alpes-Côte d'Azur"],
		Italy: ['Abruzzo', 'Aosta Valley', 'Apulia', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna', 'Friuli Venezia Giulia', 'Lazio', 'Liguria', 'Lombardy', 'Marche', 'Molise', 'Piedmont', 'Sardinia', 'Sicily', 'Trentino-South Tyrol', 'Tuscany', 'Umbria', 'Veneto'],
		Japan: ['Hokkaido', 'Aomori', 'Iwate', 'Miyagi', 'Akita', 'Yamagata', 'Fukushima', 'Ibaraki', 'Tochigi', 'Gunma', 'Saitama', 'Chiba', 'Tokyo', 'Kanagawa', 'Niigata', 'Toyama', 'Ishikawa', 'Fukui', 'Yamanashi', 'Nagano', 'Gifu', 'Shizuoka', 'Aichi', 'Mie', 'Shiga', 'Kyoto', 'Osaka', 'Hyogo', 'Nara', 'Wakayama', 'Tottori', 'Shimane', 'Okayama', 'Hiroshima', 'Yamaguchi', 'Tokushima', 'Kagawa', 'Ehime', 'Kochi', 'Fukuoka', 'Saga', 'Nagasaki', 'Kumamoto', 'Oita', 'Miyazaki', 'Kagoshima', 'Okinawa'],
		China: ['Anhui', 'Beijing', 'Chongqing', 'Fujian', 'Gansu', 'Guangdong', 'Guangxi', 'Guizhou', 'Hainan', 'Hebei', 'Heilongjiang', 'Henan', 'Hubei', 'Hunan', 'Inner Mongolia', 'Jiangsu', 'Jiangxi', 'Jilin', 'Liaoning', 'Ningxia', 'Qinghai', 'Shaanxi', 'Shandong', 'Shanghai', 'Shanxi', 'Sichuan', 'Tianjin', 'Tibet', 'Xinjiang', 'Yunnan', 'Zhejiang'],
		Russia: ['Adygea', 'Altai', 'Bashkortostan', 'Buryatia', 'Chechnya', 'Chuvashia', 'Dagestan', 'Ingushetia', 'Kabardino-Balkaria', 'Kalmykia', 'Karachay-Cherkessia', 'Karelia', 'Khakassia', 'Komi', 'Mari El', 'Mordovia', 'North Ossetia-Alania', 'Sakha', 'Tatarstan', 'Tuva', 'Udmurtia', 'Altai Krai', 'Kamchatka Krai', 'Khabarovsk Krai', 'Krasnodar Krai', 'Krasnoyarsk Krai', 'Perm Krai', 'Primorsky Krai', 'Stavropol Krai', 'Zabaykalsky Krai', 'Amur Oblast', 'Arkhangelsk Oblast', 'Astrakhan Oblast', 'Belgorod Oblast', 'Bryansk Oblast', 'Chelyabinsk Oblast', 'Irkutsk Oblast', 'Ivanovo Oblast', 'Kaliningrad Oblast', 'Kaluga Oblast', 'Kemerovo Oblast', 'Kirov Oblast', 'Kostroma Oblast', 'Kurgan Oblast', 'Kursk Oblast', 'Leningrad Oblast', 'Lipetsk Oblast', 'Magadan Oblast', 'Moscow Oblast', 'Murmansk Oblast', 'Nizhny Novgorod Oblast', 'Novgorod Oblast', 'Novosibirsk Oblast', 'Omsk Oblast', 'Orenburg Oblast', 'Oryol Oblast', 'Penza Oblast', 'Pskov Oblast', 'Rostov Oblast', 'Ryazan Oblast', 'Sakhalin Oblast', 'Samara Oblast', 'Saratov Oblast', 'Smolensk Oblast', 'Sverdlovsk Oblast', 'Tambov Oblast', 'Tomsk Oblast', 'Tula Oblast', 'Tver Oblast', 'Tyumen Oblast', 'Ulyanovsk Oblast', 'Vladimir Oblast', 'Volgograd Oblast', 'Vologda Oblast', 'Voronezh Oblast', 'Yaroslavl Oblast'],
		SouthKorea: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon', 'Ulsan', 'Goyang', 'Seongnam', 'Bucheon', 'Ansan', 'Cheongju', 'Jeonju', 'Cheonan', 'Changwon', 'Gimhae', 'Pyeongtaek', 'Hwaseong', 'Namyangju', 'Yongin', 'Siheung', 'Uijeongbu', 'Sejong', 'Guri', 'Icheon', 'Paju', 'Gwangmyeong', 'Wonju'],
		Mexico: ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Mexico City', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'],
		SouthAfrica: ['Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape'],
		Egypt: ['Alexandria', 'Aswan', 'Asyut', 'Beheira', 'Beni Suef', 'Cairo', 'Dakahlia', 'Damietta', 'Faiyum', 'Gharbia', 'Giza', 'Ismailia', 'Kafr El Sheikh', 'Luxor', 'Matrouh', 'Minya', 'Monufia', 'New Valley', 'North Sinai', 'Port Said', 'Qalyubia', 'Qena', 'Red Sea', 'Sharqia', 'Sohag', 'South Sinai', 'Suez'],
		Spain: ['Andalusia', 'Aragon', 'Asturias', 'Balearic Islands', 'Basque Country', 'Canary Islands', 'Cantabria', 'Castile and León', 'Castilla-La Mancha', 'Catalonia', 'Extremadura', 'Galicia', 'La Rioja', 'Madrid', 'Murcia', 'Navarre', 'Valencia'],
		Argentina: ['Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'],
		Indonesia: ['Aceh', 'Bali', 'Banten', 'Bengkulu', 'Central Java', 'Central Kalimantan', 'Central Sulawesi', 'East Java', 'East Kalimantan', 'East Nusa Tenggara', 'Gorontalo', 'Jakarta', 'Jambi', 'Lampung', 'Maluku', 'North Kalimantan', 'North Maluku', 'North Sulawesi', 'North Sumatra', 'Papua', 'Riau', 'Riau Islands', 'Southeast Sulawesi', 'South Kalimantan', 'South Sulawesi', 'South Sumatra', 'West Java', 'West Kalimantan', 'West Nusa Tenggara', 'West Papua', 'West Sulawesi', 'West Sumatra', 'Yogyakarta'],
		Netherlands: ['Drenthe', 'Flevoland', 'Friesland', 'Gelderland', 'Groningen', 'Limburg', 'North Brabant', 'North Holland', 'Overijssel', 'South Holland', 'Utrecht', 'Zeeland'],
		Belgium: ['Antwerp', 'East Flanders', 'Flemish Brabant', 'Hainaut', 'Liège', 'Limburg', 'Luxembourg', 'Namur', 'Walloon Brabant', 'West Flanders'],
		Sweden: ['Blekinge', 'Dalarna', 'Gävleborg', 'Gotland', 'Halland', 'Jämtland', 'Jönköping', 'Kalmar', 'Kronoberg', 'Norrbotten', 'Örebro', 'Östergötland', 'Skåne', 'Södermanland', 'Stockholm', 'Uppsala', 'Värmland', 'Västerbotten', 'Västernorrland', 'Västmanland', 'Västra Götaland'],
		Norway: ['Akershus', 'Aust-Agder', 'Buskerud', 'Finnmark', 'Hedmark', 'Hordaland', 'Møre og Romsdal', 'Nord-Trøndelag', 'Nordland', 'Oppland', 'Oslo', 'Rogaland', 'Sogn og Fjordane', 'Sør-Trøndelag', 'Telemark', 'Troms', 'Vest-Agder', 'Vestfold', 'Østfold'],
		Denmark: ['Capital Region of Denmark', 'Central Denmark Region', 'North Denmark Region', 'Region of Southern Denmark', 'Region Zealand'],
		Switzerland: ['Aargau', 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden', 'Basel-Landschaft', 'Basel-Stadt', 'Bern', 'Fribourg', 'Geneva', 'Glarus', 'Graubünden', 'Jura', 'Lucerne', 'Neuchâtel', 'Nidwalden', 'Obwalden', 'Schaffhausen', 'Schwyz', 'Solothurn', 'St. Gallen', 'Thurgau', 'Ticino', 'Uri', 'Valais', 'Vaud', 'Zug', 'Zurich'],
		Austria: ['Burgenland', 'Carinthia', 'Lower Austria', 'Salzburg', 'Styria', 'Tyrol', 'Upper Austria', 'Vienna', 'Vorarlberg'],
		Finland: ['Åland Islands', 'Central Finland', 'Central Ostrobothnia', 'Kainuu', 'Kymenlaakso', 'Lapland', 'North Karelia', 'Northern Ostrobothnia', 'Northern Savonia', 'Ostrobothnia', 'Päijät-Häme', 'Pirkanmaa', 'Satakunta', 'South Karelia', 'Southern Ostrobothnia', 'Southern Savonia', 'Uusimaa', 'Varsinais-Suomi'],
	};

	$('#country').change(function () {
		const selectedCountry = $(this).val();
		const stateDropdown = $('#state');
		stateDropdown.empty();
		stateDropdown.append('<option value="">Select State</option>');

		if (countryStateMap[selectedCountry]) {
			countryStateMap[selectedCountry].forEach(function (state) {
				stateDropdown.append(`<option value="${state}">${state}</option>`);
			});
		}
	});

	const stateCityMap = {
		// Nigeria States and Cities
		Abia: ['Aba', 'Umuahia'],
		Abuja: ['Abuja'],
		Adamawa: ['Yola', 'Mubi'],
		'Akwa Ibom': ['Uyo', 'Ikot Ekpene'],
		Anambra: ['Awka', 'Onitsha'],
		Bauchi: ['Bauchi', 'Azare'],
		Bayelsa: ['Yenagoa'],
		Benue: ['Makurdi', 'Gboko'],
		Borno: ['Maiduguri', 'Biu'],
		'Cross River': ['Calabar', 'Ikom'],
		Delta: ['Asaba', 'Warri'],
		Ebonyi: ['Abakaliki'],
		Edo: ['Benin City'],
		Ekiti: ['Ado-Ekiti'],
		Enugu: ['Enugu', 'Nsukka'],
		Gombe: ['Gombe'],
		Imo: ['Owerri'],
		Jigawa: ['Dutse', 'Hadejia'],
		Kaduna: ['Kaduna', 'Zaria'],
		Kano: ['Kano', 'Wudil'],
		Katsina: ['Katsina', 'Daura'],
		Kebbi: ['Birnin Kebbi'],
		Kogi: ['Lokoja', 'Okene'],
		Kwara: ['Ilorin', 'Offa'],
		Lagos: ['Lagos', 'Ikeja'],
		Nasarawa: ['Lafia', 'Keffi'],
		Niger: ['Minna', 'Suleja'],
		Ogun: ['Abeokuta', 'Ijebu Ode'],
		Ondo: ['Akure', 'Ondo City'],
		Osun: ['Oshogbo', 'Ife'],
		Oyo: ['Ibadan', 'Oyo'],
		Plateau: ['Jos'],
		Rivers: ['Port Harcourt'],
		Sokoto: ['Sokoto'],
		Taraba: ['Jalingo'],
		Yobe: ['Damaturu'],
		Zamfara: ['Gusau'],

		// UK Regions and Cities
		England: ['London', 'Birmingham', 'Manchester', 'Liverpool', 'Leeds', 'Sheffield', 'Bristol', 'Newcastle', 'Nottingham', 'Leicester'],
		Scotland: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Inverness', 'Stirling'],
		Wales: ['Cardiff', 'Swansea', 'Newport', 'Wrexham'],
		'Northern Ireland': ['Belfast', 'Derry', 'Lisburn', 'Newry'],
	};

		$('#state').change(function () {
			const selectedState = $(this).val();
			const cityDropdown = $('#city');
			cityDropdown.empty();
			cityDropdown.append('<option value="">Select City</option>');

			if (stateCityMap[selectedState]) {
				stateCityMap[selectedState].forEach(function (city) {
					cityDropdown.append(`<option value="${city}">${city}</option>`);
				});
			}
		});

	const phoneNumberInput = document.getElementById('phoneNumber');
	// const countryCodeSelect = document.getElementById('countryCode');
	const invalidFeedback = document.querySelector('.invalid-feedback');
	const agreeCheckbox = document.getElementById('agreeCheckbox');
	const nextButton = document.getElementById('nextBtn');

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

	phoneNumberInput.addEventListener('input', function () {
		const phoneNumber = this.value.replace(/\D/g, ''); // Remove non-numeric characters

		if (phoneNumber.length < 10 || phoneNumber.length > 10) {
			this.classList.add('invalid');
			invalidFeedback.style.display = 'block';
			invalidFeedback.style.width = 'fit-content';
		} else {
			this.classList.remove('invalid');
			invalidFeedback.style.display = 'none';
		}
	});

	agreeCheckbox.addEventListener('change', function () {
		nextButton.disabled = !this.checked;
	});
	
	$('#nextBtn').click(function (event) {
		event.preventDefault();
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
	
	// Get the modal
	var modal = document.getElementById('modal');
	
	// Get the link that opens the modal
	var link = document.getElementById('terms-link');
	
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName('close')[0];
	
	// When the user clicks the link, open the modal
	link.onclick = function (event) {
		event.preventDefault(); // Prevent the default link behavior
		modal.style.display = 'block';
	};
	
	// When the user clicks on <span> (x), close the modal
	span.onclick = function () {
		modal.style.display = 'none';
	};
	
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = 'none';
		}
	};
	
	// Credit card info

	document.getElementById('cardNumber').addEventListener('input', function (e) {
		let value = e.target.value.replace(/\D/g, '');
		value = value.match(/.{1,4}/g)?.join(' ') || value;
		e.target.value = value;
	});

	document.getElementById('expiryDate').addEventListener('input', function (e) {
		let value = e.target.value.replace(/\D/g, '');
		if (value.length > 2) {
			value = value.slice(0, 2) + '/' + value.slice(2);
		}
		e.target.value = value;
	});

	document.getElementById('cvv').addEventListener('input', function (e) {
		e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
	});

	
});
