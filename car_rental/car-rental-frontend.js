$(document).ready(function() {
	loadTable();
	$("#car-rental-table tbody").on("click", "tr", function(event) {
		console.log($(this));
		$(this).addClass("highlight").siblings().removeClass("highlight");
		$("#next-button").removeClass("disabled");
	});	
});

function loadTable() {
	var rentals = JSON.parse(sessionStorage.getItem("car-rentals"));
	console.log(rentals)
	// Insert in reverse to display correctly.
	for (var i = rentals.length - 1; rentals != null && i >=0; i--) {
		var rental = rentals[i];
		var row = '<tr class="car-rental-row"> <th scope="row">' + rental.make + '</th>\
		<td>' + rental.model + '</td>\
		<td>' + rental.year + '</td>\
		<td>' + rental.seating_capacity + '</td>\
		<td>' + rental.car_type + '</td>\
		<td>' + rental.daily_rate + '</td>\
		</tr>';
		$("#car-rental-table tbody").prepend(row);
	}
}