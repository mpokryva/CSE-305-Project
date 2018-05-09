var results = [];
var selectedIndex = 0;
const serverURL = "http://18.221.125.221";
$(document).ready(function() {
	loadTable();
	$("#car-rental-table tbody").on("click", "tr", function(event) {
		selectedIndex = results.length - $(this)[0].rowIndex;
		console.log(selectedIndex);
		$(this).addClass("highlight").siblings().removeClass("highlight");
		$("#next-button").removeClass("disabled");
	});

	$("#next-button").on("click", function(event) {
		if ($("#next-button").hasClass("disabled")) {
			alert("Please make a selection first.")
		} else {
			var f = JSON.stringify(results[selectedIndex]);
			sessionStorage.setItem("car_rental", f);
			console.log(sessionStorage.getItem("car_rental"))
			redirect();
		}
	});	
});

function redirect() {
	var bookingType = JSON.parse(sessionStorage.getItem("booking_type"));
	var bookingStep = parseInt(sessionStorage.getItem("booking_step"));
	console.log(bookingType);
	console.log(bookingStep);
	if (bookingType == null || bookingStep == null) {
		return alert("An error has occured.");
	}
	bookingStep++;
	sessionStorage.setItem("booking_step", bookingStep);
	if (bookingStep >= bookingType.length) {
		window.location.replace(serverURL + "/addmember");
	} else {
		window.location.replace(serverURL + "/" + bookingType[bookingStep] + "/filter.html");
	}
}

function loadTable() {
	results = JSON.parse(sessionStorage.getItem("car_rentals"));
	console.log(results)
	if (!(results instanceof Array)) {
		alert(results);
		return;
	}
	// Insert in reverse to display correctly.
	for (var i = results.length - 1; results != null && i >=0; i--) {
		var res = results[i];
		var row = '<tr class="car-rental-row"> <th scope="row">' + res.make + '</th>\
		<td>' + res.model + '</td>\
		<td>' + res.year + '</td>\
		<td>' + res.seating_capacity + '</td>\
		<td>' + res.car_type + '</td>\
		<td>' + res.daily_rate + '</td>\
		</tr>';
		$("#car-rental-table tbody").prepend(row);
	}
}
