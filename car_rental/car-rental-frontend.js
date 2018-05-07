$(document).ready(function() {
	loadTable();
	$("#car-rental-table tbody").on("click", "tr", function(event) {
		console.log($(this));
		$(this).addClass("highlight").siblings().removeClass("highlight");
		$("#next-button").removeClass("disabled");
	});	
});

function loadTable() {
	var results = JSON.parse(sessionStorage.getItem("car-rentals"));
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