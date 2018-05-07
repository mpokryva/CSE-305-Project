$(document).ready(function() {
	loadTable();
	$("#flight-table tbody").on("click", "tr", function(event) {
		console.log($(this));
		$(this).addClass("highlight").siblings().removeClass("highlight");
		$("#next-button").removeClass("disabled");
	});	
});

function loadTable() {
	var results = JSON.parse(sessionStorage.getItem("flights"));
	console.log(results)
	if (!(results instanceof Array)) {
		alert(results);
		return;
	}
	for (var i = 0; results != null && i < results.length; i++) {
		var res = results[i];
		var depDate = new Date(res.dep_date);
		var arrDate = new Date(res.arr_date);
		var row = '<tr class="flight-row"> <th scope="row">' + res.airline + '</th>\
		<td>' + depDate.toLocaleTimeString() + '</td>\
		<td>' + arrDate.toLocaleTimeString() + '</td>\
		<td>' + res.dep_city + '</td>\
		<td>' + res.arr_city + '</td>\
		<td>' + res.class + '</td>\
		<td>' + res.fare + '</td>\
		</tr>';
		$("#flight-table tbody").prepend(row);
	}
}
