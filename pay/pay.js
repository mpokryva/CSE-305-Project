const serverURL = "http://18.221.125.221";
$(document).ready(function() {
	var price = 0;
	var flight = sessionStorage.getItem("flight");
	if (flight != null){
		flight = JSON.parse(flight);
		loadTable();
		price += parseFloat(flight.fare);
	} else {
		console.log("HDING");
		$("#flight-table").hide();
	}
	var cruise = sessionStorage.getItem("cruise");
	if (cruise != null){
		cruise = JSON.parse(cruise);
		loadTable2();
		price += parseFloat(cruise.fare);
	}
	var car_rental = sessionStorage.getItem("car_rental");
	if (car_rental != null){
		car_rental = JSON.parse(car_rental);
		loadTable3();
		price += parseFloat(car_rental.daily_rate);
	}
	var accommodation = sessionStorage.getItem("accommodation");
	if (accommodation != null){
		accommodation = JSON.parse(accommodation);
		console.log(accommodation);
		loadTable4();
		price += parseFloat(accommodation.daily_rate);
	}
	document.getElementById("price").value = price;
	$('p#amntdue').text("Total: $ "+ price+".00");

	$("#payment-form").submit(function(e) {
		e.preventDefault();
		var formData = jsonForm($("#payment-form").serializeArray());
		var accommodation = JSON.parse(sessionStorage.getItem("accommodation"));
		if (accommodation != null) {
			formData.accommodation_id = accommodation.id;
		}
		var flight = JSON.parse(sessionStorage.getItem("flight"));
		if (flight != null) {
			formData.flight_no = flight.flight_no;
		}
		var rental = JSON.parse(sessionStorage.getItem("car_rental"));
		if (rental != null) {
			formData.rental_no = rental.rental_no;
		}
		var cruise = JSON.parse(sessionStorage.getItem("cruise"));
		if (cruise != null) {
			formData.cruise_no = cruise.cruise_no;
		}
		var memberIds = JSON.parse(sessionStorage.getItem("member_ids"));
		if (memberIds != null) {
			formData.member_ids = memberIds;
		}
		console.log(formData);
		$.ajax({
			type: "POST",
			url: "/api/payment",
			data: formData,
			success: function(res) {
				console.log(res);
				if(confirm("Booking was successful!")) {
					window.location.replace(serverURL);
				} else {
					window.location.replace(serverURL);
				}
			}, 
			error: function(err) {
				console.log(err);
				alert(err);
			}
		});
	});

});

function loadTable() {
	results = JSON.parse(sessionStorage.getItem("flight"));
	console.log(results)
	var res = results;
	var depDate = new Date(res.dep_date);
	var arrDate = new Date(res.arr_date);
	var row = '<tr class="flight-row"> <th scope="row">' + res.airline + '</th>\
	<td>' + depDate.toLocaleString() + '</td>\
	<td>' + arrDate.toLocaleString() + '</td>\
	<td>' + res.dep_city + '</td>\
	<td>' + res.arr_city + '</td>\
	<td>' + res.class + '</td>\
	<td>' + res.fare + '</td>\
	</tr>';
	$("#flight-table tbody").prepend(row);
}


function loadTable2() {
	results = JSON.parse(sessionStorage.getItem("cruise"));
	console.log(results)

	var res = results;
	var depDate = new Date(res.dep_date);
	var arrDate = new Date(res.arr_date);
	var row = '<tr class="cruise-row"> <th scope="row">' + res.cruise_line + '</th>\
	<td>' + depDate.toLocaleString() + '</td>\
	<td>' + arrDate.toLocaleString() + '</td>\
	<td>' + res.dep_city + '</td>\
	<td>' + res.arr_city + '</td>\
	<td>' + res.class + '</td>\
	<td>' + res.fare + '</td>\
	</tr>';
	$("#cruise-table tbody").prepend(row);
}


function loadTable3() {
	results = JSON.parse(sessionStorage.getItem("car_rental"));
	
	// Insert in reverse to display correctly.
	var res = results;
	var row = '<tr class="car-rental-row"> <th scope="row">' + res.make + '</th>\
	<td>' + res.model + '</td>\
	<td>' + res.year + '</td>\
	<td>' + res.seating_capacity + '</td>\
	<td>' + res.car_type + '</td>\
	<td>' + res.daily_rate + '</td>\
	</tr>';
	$("#car-rental-table tbody").prepend(row);
}

function loadTable4() {
	var results = JSON.parse(sessionStorage.getItem("accommodation"));

	var res = results;
	var row = '<tr class="accommodation-row"> <th scope="row">' + res.name + '</th>\
	<td>' + res.type + '</td>\
	<td>' + res.daily_rate + '</td>\
	</tr>';
	$("#accommodation-table tbody").prepend(row);	
}

function createBooking(){ 
	var payment_id = sessionStorage.getItem("payment_id")
}

function jsonForm(formArray) {
	var ret = {};
	for (var i = 0; i < formArray.length; i++){
		ret[formArray[i]['name']] = formArray[i]['value'];
	}
	return ret;
}
