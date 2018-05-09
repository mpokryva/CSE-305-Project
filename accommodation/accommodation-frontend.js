var results = [];
var selectedIndex = 0;
const serverURL = "http://18.221.125.221";
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
	results = JSON.parse(sessionStorage.getItem("accommodations"));
	console.log(results)
	if (!(results instanceof Array)) {
		alert(results);
		return;
	}
	for (var i = 0; results != null && i < results.length; i++) {
		var res = results[i];
		var row = '<tr class="accommodation-row"> <th scope="row">' + res.name + '</th>\
		<td>' + res.type + '</td>\
		<td>' + res.daily_rate + '</td>\
		</tr>';
		$("#accommodation-table tbody").append(row);
	}
}
