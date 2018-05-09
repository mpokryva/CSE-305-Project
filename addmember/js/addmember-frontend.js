var memberIds = [];

const serverURL = "http://18.221.125.221";
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
				sessionStorage.setItem("memberIds", JSON.stringify(memberIds));
			}, 
			error: function(err) {
				console.log(err);
				alert(err);
			}
		});
		return false;
	});
});

function jsonForm(formArray) {
	var ret = {};
	for (var i = 0; i < formArray.length; i++){
		ret[formArray[i]['name']] = formArray[i]['value'];
	}
	return ret;
}
