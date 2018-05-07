$(document).ready(function() {
	loadTable();
	$("#accommodation-table tbody").on("click", "tr", function(event) {
		console.log($(this));
		$(this).addClass("highlight").siblings().removeClass("highlight");
		$("#next-button").removeClass("disabled");
	});	
});

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