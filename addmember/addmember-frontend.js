var memberIds = [];
var personAdded = false;
$(document).ready(function() {
	$("#addmember-form").submit(function(e) {
		e.preventDefault();
		var formData = jsonForm($("#addmember-form").serializeArray());
		console.log(formData);
		$.ajax({
			type: "POST",
			url: "/api/addmember",
			data: formData,
			success: function(res) {
				console.log(res);
				memberIds.push(res.id);
				sessionStorage.setItem("member_ids", JSON.stringify(memberIds));	
				$("#finish-button").removeClass("disabled");
			}, 
			error: function(err) {
				console.log(err);
				alert(err);
			}
		});
	});
	$("#finish-button").click(function(e) {
		if ($(this).hasClass("disabled")) {
			alert("Please add at least one person");
			e.preventDefault();
		}
	});
});


function jsonForm(formArray) {
	var ret = {};
	for (var i = 0; i < formArray.length; i++){
		ret[formArray[i]['name']] = formArray[i]['value'];
	}
	return ret;
}
