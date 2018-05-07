const apiURL = "/api/flight";
$("#get-flights").click(function(event) {
	$.ajax({
		type: "POST",
		url: apiURL,
		data: {
			dep_city: "New York City"
		},
		success: function(res) {
			for (var i = 0; i < res.length; i++) {
				var flight = res[i];
				var depDate = new Date(flight.dep_date);
				var arrDate = new Date(flight.arr_date);
				console.log(arrDate)
				var row = '<tr class="flight-row"> <th scope="row">' + flight.flight_no + '</th>\
				<td>' + depDate.getUTCHours() + ":" + depDate.getUTCMinutes() + '</td>\
				<td>' + arrDate.getUTCHours() + ":" + arrDate.getUTCMinutes() + '</td>\
				<td>' + flight.class + '</td>\
				<td>' + flight.fare + '</td>\
				</tr>';
				$("#flight-table tbody").prepend(row);
			}
		}, 
		error: function(res) {
			alert("Error");
		}
	});
});

$(document).ready(function() {
	loadTable();
	$("#flight-table tbody").on("click", "tr", function(event) {
		console.log($(this));
		$(this).addClass("highlight").siblings().removeClass("highlight");
		$("#next-button").removeClass("disabled");
	});	
});

function loadTable() {
	var flights = JSON.parse(sessionStorage.getItem("flights"));
	console.log(flights)
	for (var i = 0; flights != null && i < flights.length; i++) {
		var flight = flights[i];
		var depDate = new Date(flight.dep_date);
		var arrDate = new Date(flight.arr_date);
		var row = '<tr class="flight-row"> <th scope="row">' + flight.flight_no + '</th>\
		<td>' + depDate.toLocaleTimeString() + '</td>\
		<td>' + arrDate.toLocaleTimeString() + '</td>\
		<td>' + flight.class + '</td>\
		<td>' + flight.fare + '</td>\
		</tr>';
		$("#flight-table tbody").prepend(row);
	}
}