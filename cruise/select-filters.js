$("#dep_date").datepicker({});
$("#arr_date").datepicker({});
const serverURL = "http://130.245.170.55";
$(document).ready(function() {
	console.log("hey")
	$("#cruise-form").submit(function(e) {
		e.preventDefault();
		var formData = jsonForm($("#cruise-form").serializeArray());
		console.log(formData);
		$.ajax({
			type: "POST",
			url: "/api/cruise",
			data: formData,
			success: function(res) {
				sessionStorage.setItem("cruises", JSON.stringify(res));
				window.location.replace(serverURL + "/cruise")
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
