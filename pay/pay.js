$(document).ready(function() {
	var price = 0;
	var flight = sessionStorage.getItem("flight");
	if (flight != null){
		flight = JSON.parse(flight);
		loadTable();
		price += parseFloat(flight.fare);
	} else {
		$("#flight-table").hide();
		$("#flight-label").hide();
	}
	var cruise = sessionStorage.getItem("cruise");
	if (cruise != null){
		cruise = JSON.parse(cruise);
		loadTable2();
		price += parseFloat(cruise.fare);
	}else {
		$("#cruise-table").hide();
		$("#cruise-label").hide();
	}
	var car_rental = sessionStorage.getItem("car_rental");
	if (car_rental != null){
		car_rental = JSON.parse(car_rental);
		loadTable3();
		price += parseFloat(car_rental.daily_rate);
	}else {
		$("#car-rental-table").hide();
		$("#car-rental-label").hide();
	}
	var accommodation = sessionStorage.getItem("accommodation");
	if (accommodation != null){
		accommodation = JSON.parse(accommodation);
		console.log(accommodation);
		loadTable4();
		price += parseFloat(accommodation.daily_rate);
	}else {
		$("#accommodation-table").hide();
		$("#accommodation-label").hide();
	}
	document.getElementById("price").value = price;
	$('p#amntdue').text("Total: $ "+ price+".00");
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