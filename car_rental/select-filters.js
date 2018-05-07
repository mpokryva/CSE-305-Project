$("#dep_date").datepicker({});
$("#arr_date").datepicker({});
const serverURL = "http://130.245.170.55";
$(document).ready(function() {
	$("#car-rental-form").submit(function(e) {
		e.preventDefault();
		var formData = jsonForm($("#car-rental-form").serializeArray());
		console.log(formData);
		$.ajax({
			type: "POST",
			url: "/api/car_rental",
			data: formData,
			success: function(res) {
				sessionStorage.setItem("car-rentals", JSON.stringify(res));
				window.location.replace(serverURL + "/car_rental")
			}, 
			error: function(res) {
				alert("Error");
			}
		});
	});
})

function jsonForm(formArray) {
	var ret = {};
	for (var i = 0; i < formArray.length; i++){
		ret[formArray[i]['name']] = formArray[i]['value'];
	}
	return ret;
}
