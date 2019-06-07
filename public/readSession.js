window.onload = function(){
	
	var name = sessionStorage.getItem("food-name");
	document.getElementById("name").innerHTML = name;
	
	var fat = sessionStorage.getItem("fat");
	document.getElementById("fat").innerHTML = fat + "g";
	
	var carbs = sessionStorage.getItem("carbs");
	document.getElementById("carbs").innerHTML = carbs + "g";
	
	var protein = sessionStorage.getItem("protein");
	document.getElementById("protein").innerHTML = protein + "g";
	
	var sugar = sessionStorage.getItem("sugar");
	document.getElementById("sugar").innerHTML = sugar + "g";
	
}