const serverURL = "http://18.221.125.221";
$(document).ready(function() {
	$("#accommodation").on("click", function(event) {
		resetSelections();
		setBookingType(["accommodation"]);
		// console.log(sessionStorage.getItem("booking_type"));
	});	
	$('a#flight').on("click", function(event) {
		resetSelections();
		setBookingType(["flight"]);
		// console.log(sessionStorage.getItem("booking_type"));
	});
	$('a#cruise').on("click",  function(event) {
		resetSelections();
		setBookingType(["cruise"]);

		// console.log(sessionStorage.getItem("booking_type"));
	});	
	$('a#car').on("click",  function(event) {
		resetSelections();
		setBookingType(["car_rental"]);
		
		// console.log(sessionStorage.getItem("booking_type"));
	});	
	$("#package_modal_btn").on("click", function(event) {
		var opts = [];
		$("input[type=checkbox]").each(function() {
			if (this.checked) {
				opts.push($(this).val());
			}
		});
		if (opts.length == 0) {
			return alert("Please select at least one option.");
		}
		console.log(opts);
		resetSelections();
		setBookingType(opts);
		window.location.replace(serverURL + "/" + opts[0] + "/filter.html")
	});
});


function resetSelections() {
	sessionStorage.clear();
	sessionStorage.setItem("booking_step", 0);
}

function setBookingType(typeArr) {
	sessionStorage.setItem("booking_type", JSON.stringify(typeArr));
}