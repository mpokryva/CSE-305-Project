const apiURL = "/api/flight";
$("#get-flights").click(function(event) {
	$.ajax({
		type: "POST",
		url: apiURL,
		data: {
			dep_city: "New York City"
		},
		success: function(res) {
			console.log(res)
			for (var i = 0; i < res.length; i++) {
				var flight = res[i];
				var row = '<tr class="flight-row"> <th scope="row">' + flight.flight_no + '</th>\
				<td>' + flight.dep_date + '</td>\
				<td>' + flight.arr_date + '</td>\
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
	$("#flight-table tbody").on("click", "tr", function(event) {
		console.log($(this));
		$(this).addClass("highlight").siblings().removeClass("highlight");
	});
});
