var results = [];
var selectedIndex = 0;
const serverURL = "http://130.245.170.55";
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
	var bookingType = sessionStorage.getItem("booking_type");
	console.log(bookingType);
	if (bookingType == null) {
		return alert("An error has occured.");
	}
	var path;
	switch (bookingType) {
		case "flight":
			return alert("An error has occured.");
		case "cruise":
			return alert("An error has occured.");
		case "car_rental":
			path = "/pay";
			break;
		case "accommodation":
			return alert("An error has occured.");
		case "package":
			path = "/accommodation/filter.html"
			break;
	}
	window.location.replace(serverURL + path);
}

function loadTable() {
	results = JSON.parse(sessionStorage.getItem("car-rentals"));
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