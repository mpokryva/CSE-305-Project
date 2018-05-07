var results = [];
var selectedIndex = 0;
const serverURL = "http://130.245.170.55";
$(document).ready(function() {
	loadTable();
	$("#cruise-table tbody").on("click", "tr", function(event) {
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
			sessionStorage.setItem("cruise", f);
			console.log(sessionStorage.getItem("cruise"))
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
			path = "/pay";
			break;
		case "car_rental":
			return alert("An error has occured.");
		case "accommodation":
			return alert("An error has occured.");
		case "package":
			path = "/car_rental/filter.html"
			break;
	}
	window.location.replace(serverURL + path);
}

function loadTable() {
	results = JSON.parse(sessionStorage.getItem("cruises"));
	console.log(results)
	if (!(results instanceof Array)) {
		alert(results);
		return;
	}
	for (var i = 0; results != null && i < results.length; i++) {
		var res = results[i];
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
}
