const apiURL = "/api/cruise";
$("#get-cruises").click(function(event) {
	$.ajax({
		type: "POST",
		url: apiURL,
		data: {
			dep_city: "New York City"
		},
		success: function(res) {
			for (var i = 0; i < res.length; i++) {
				var cruise = res[i];
				var depDate = new Date(cruise.dep_date);
				var arrDate = new Date(cruise.arr_date);
				console.log(arrDate)
				var row = '<tr class="cruise-row"> <th scope="row">' + cruise.cruise_no + '</th>\
				<td>' + depDate.getUTCHours() + ":" + depDate.getUTCMinutes() + '</td>\
				<td>' + arrDate.getUTCHours() + ":" + arrDate.getUTCMinutes() + '</td>\
				<td>' + cruise.class + '</td>\
				<td>' + cruise.fare + '</td>\
				</tr>';
				$("#cruise-table tbody").prepend(row);
			}
		}, 
		error: function(res) {
			alert("Error");
		}
	});
});

$(document).ready(function() {
	loadTable();
	$("#cruise-table tbody").on("click", "tr", function(event) {
		console.log($(this));
		$(this).addClass("highlight").siblings().removeClass("highlight");
		$("#next-button").removeClass("disabled");
	});	
});

function loadTable() {
	var cruises = JSON.parse(sessionStorage.getItem("cruises"));
	console.log(cruises)
	for (var i = 0; cruises != null && i < cruises.length; i++) {
		var cruise = cruises[i];
		var depDate = new Date(cruise.dep_date);
		var arrDate = new Date(cruise.arr_date);
		var row = '<tr class="cruise-row"> <th scope="row">' + cruise.cruise_no + '</th>\
		<td>' + depDate.toLocaleTimeString() + '</td>\
		<td>' + arrDate.toLocaleTimeString() + '</td>\
		<td>' + cruise.class + '</td>\
		<td>' + cruise.fare + '</td>\
		</tr>';
		$("#cruise-table tbody").prepend(row);
	}
}