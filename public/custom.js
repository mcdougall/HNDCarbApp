var food = {};
function handleSuccess() {
	var data = JSON.parse(this.responseText);
	for (var item in data) {
		var li = document.createElement("li");
		li.className += " collection-item avatar";
		
		var item1 = document.createElement("i");
		item1.className += "material-icons circle red";
		item1.textContent = "brightness_1";
		
		var item2 = document.createElement("span");
		item2.className += "title";
		item2.textContent = data[item]['name'];
		
		var item3 = document.createElement("p");
		item3.textContent = "Carbohydrates: " + data[item]['nutritionper100gcarbohydrate'];
		
		var item4 = document.createElement("p");
		item4.textContent = "Protein: " + data[item]['nutritionper100gprotein'];
		
		var item5 = document.createElement("a");
		item5.href = "/food";
		item5.className += "secondary-content";
		item5.setAttribute("data-name", data[item]["name"]);
		item5.setAttribute("data-fat", data[item]["nutritionper100gfat"]);
		item5.setAttribute("data-carbs", data[item]["nutritionper100gcarbohydrate"]);
		item5.setAttribute("data-protein", data[item]["nutritionper100gprotein"]);
		item5.setAttribute("data-sugar", data[item]["nutritionper100gsugars"]);
		
		
		var item5child = document.createElement("i");
		item5child.className = "material-icons";
		item5child.innerHTML = "grade";
		
		//item5.appendChild(item5child);
		
		li.appendChild(item1);
		li.appendChild(item2);
		li.appendChild(item3);
		li.appendChild(item4);
		li.appendChild(item5);
		item5.appendChild(item5child);
	
		
	
		
		var result = document.getElementById("food");
		result.appendChild(li);
		
			// Check eventListener
	if(item5.addEventListener){
		item5.addEventListener("click", function(event){
			var target = event.currentTarget;
			sessionStorage.clear();
			
			sessionStorage.setItem('food-name', target.getAttribute("data-name"));
			sessionStorage.setItem('fat', target.getAttribute("data-fat"));
			sessionStorage.setItem('carbs', target.getAttribute("data-carbs"));
			sessionStorage.setItem('protein', target.getAttribute("data-protein"));
			sessionStorage.setItem('sugar', target.getAttribute("data-sugar"));
			
		});
	}
	}
	

}



function handleError() {
	var h5 = document.getElementById("list");
	h5.style.color = "red";
	h5.innerHTML = "An error has occurred";
	var error = document.getElementById("main");
	error.appendChild(h5);
	
	
}
  // Create an XHR object
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/foods');
  xhr.onload = handleSuccess;
  xhr.onerror = handleError;
  xhr.send();