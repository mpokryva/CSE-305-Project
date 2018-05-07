var results = [];
var selectedIndex = 0;
const serverURL = "http://130.245.170.55";
$(document).ready(function() {
	loadTable();
	$("#accommodation-table tbody").on("click", "tr", function(event) {
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
			sessionStorage.setItem("accommodation", f);
			console.log(sessionStorage.getItem("accommodation"))
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
			return alert("An error has occured.");
		case "accommodation":
		case "package":
			path = "/pay";
			break;
	}
	window.location.replace(serverURL + path);
}


function loadTable() {
	var results = JSON.parse(sessionStorage.getItem("accommodations"));
	console.log(results)
	if (!(results instanceof Array)) {
		alert(results);
		return;
	}
	for (var i = results.length - 1; results != null && i >= 0; i--) {
		var res = results[i];
		var row = '<tr class="accommodation-row"> <th scope="row">' + res.name + '</th>\
		<td>' + res.type + '</td>\
		<td>' + res.daily_rate + '</td>\
		</tr>';
		$("#accommodation-table tbody").prepend(row);
	}
}