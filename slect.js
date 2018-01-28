//global declarations
var main_div
var company_div;
var auth;
var user_name;
var selection_name;
var selText;
var textArr;
var selections= [];
var data = {};

//function for getting data from JSON file data.json
function getData(){
	var ajaxData;
	// branch for native XMLHttpRequest object
	if (window.XMLHttpRequest){
		ajaxData=new XMLHttpRequest()
  	}
	// branch for IE/Windows ActiveX version
	else if (window.ActiveXObject){
  		ajaxData=new ActiveXObject("Microsoft.XMLHTTP")
  	}
	else{	
		alert("Please update your browser to view this page!");
		return false;
  	}
    ajaxData.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200){
			if((typeof(JSON) != 'undefined')){
				data = JSON.parse(this.responseText);
				createMenus("option_1");
			} 
			else{
				data = eval('(' + this.responseText + ')');
				createMenus("option_1");
			}
		}
	};
	ajaxData.open("GET", "data.json", true);
	ajaxData.send();
}

//init function runs on body onload
function init() {
	//main_div contains select menus
	main_div = document.getElementById("main");
	company_div = document.getElementById("company");
	if(window.localStorage){
		user_name = localStorage.name;
	}
	else{
		user_name = GetCookie("name");
	}
	
	//changing background of div on mousover
	if(document.attachEvent){
		if(company_div.style.display !== "none"){
			company_div.attachEvent("mouseover", function(){ company_div.style.backgroundColor = "#efefef"; });
		}
	}
	else{
		if(company_div.style.display !== "none"){
			company_div.addEventListener("mouseover", function(){ company_div.style.backgroundColor = "#efefef"; });
		}
	}
	if(document.attachEvent){
			if(company_div.style.display !== "none"){
			company_div.attachEvent("mouseout", function(){ company_div.style.backgroundColor = "white"; });
		}
	}
	else {
		if(company_div.style.display !== "none"){
			company_div.addEventListener("mouseout", function(){ company_div.style.backgroundColor = "white"; });
		}
	}
	//creating span for display name of the user after form submission
	var name_span = document.createElement("span");
	var nameText = document.createTextNode("Hey, " + user_name);
	name_span.appendChild(nameText);
	name_span.style.cssFloat = "right";
	document.getElementById("career-fair-header").appendChild(name_span);
	
	//call getData function 
	getData();
}

//function for onchange
function onchangeselect(changedSelect) {
	console.log(changedSelect);
	var id_val = changedSelect.parentNode.id;
	var sol = changedSelect.value;
	console.log(sol);
	console.log(id_val);
	var parent = changedSelect.parentNode;
	console.log(parent);
	deletion(parent, changedSelect);

	selection_name = document.createElement("h3");
	selection_name.setAttribute("class", "info");


	textArr = ['college', 'major'];
	console.log(textArr[id_val -1 ]);
	selText = document.createTextNode("Your " + textArr[id_val - 1] + " is: " + sol);
	selection_name.appendChild(selText);

	if(id_val == 3) {
		showCompany(sol); 
	} else if(data[sol]) {
		createMenus(sol);
	}
	else {
		console.log("here");
		var msg = document.createElement("h1");
		var nodeText = document.createTextNode("Sorry, no companies coming up this career fair! Apply on handshake instead!");
		msg.appendChild(nodeText);
		var section = document.createElement("div");
		section.setAttribute("id", 3);
		main_div.appendChild(section);
		section.appendChild(msg);
	}
}

//this function gives deletes different levels depending on user's selection
function deletion(parent, changedSelect){
	console.log("deletes!!!");	
	var index = -1;
	var arr = parent.parentNode.childNodes; 
	
	if(company_div.hasChildNodes()){
		company_div.removeChild(company_div.firstChild);
		company_div.style.display = "none";
	}
	if(arr){
		console.log(typeof(arr));
		for(var i=0; i< arr.length; i++) {
			var childNode = arr[i];
			console.log(childNode);
			if(childNode === parent) {
				index = i;
			}
			if(i > index && index != -1) {
				parent.parentNode.removeChild(childNode);
				i--;
			}
		}
	}
}

//for dynamically creating select menus
function createMenus(x) {
		var opt_list;
		var id_value = data[x].id;
		var ques = data[x].question;
		
		//getting the value of auth from the local storage.
		if(window.localStorage){
			auth = localStorage.auth;
		}
		else{
			auth = GetCookie(auth);
		}
		//preparing list of companies when the candidate doesnot require US Sponsorship.
		if(id_value === 3 && auth == 1) {
			opt_list = data[x].options[1];
			//console.log(opt_list);
		}
		//preparing list of companies when the candidate requires US Sponsorship.
		else if((id_value === 3 && auth == 2)){
			opt_list = data[x].options[2];
			//console.log(opt_list);
		}
		else {
			opt_list = data[x].options;
			console.log(opt_list);
		}
		//if list has data
		if(opt_list !== undefined){
			var default_text = document.createTextNode(ques);
			var sel = document.createElement("select");
			sel.onchange = function(){onchangeselect(this)};
			var default_opt = document.createElement('option');
			default_opt.appendChild(default_text);
			default_opt.setAttribute("disabled", "disabled");
			default_opt.setAttribute("selected", "selected");
			sel.appendChild(default_opt);	
			
			//generating option tags
			for(var i = 0; i<opt_list.length; i++){
				console.log("here");
				var opt = document.createElement('option');
				console.log(opt);
				opt.value = opt_list[i];
				opt.text = opt_list[i] ;
				sel.appendChild(opt);	
			}
			var section = document.createElement("div");
			section.setAttribute("id", id_value);
			main_div.appendChild(section);
			if(id_value == 2 || id_value == 3){
				section.appendChild(selection_name);
			}
			//section.appendChild(ques_header);
			section.appendChild(sel);
		}
		else {
			var msg = document.createElement("h1");
			var nodeText = document.createTextNode("Sorry, no companies coming up this career fair! Apply on handshake instead!");
			msg.appendChild(nodeText);
			var section = document.createElement("div");
			section.setAttribute("id", 3);
			main_div.appendChild(section);
			section.appendChild(msg);
		}
}

function info(type, attr,  name, value) {
	var x = document.createElement(type);
	x.setAttribute(attr, name);
	var text = document.createTextNode(value);
	x.appendChild(text);
	return x;
}

function showCompany(x){

	//div for company information
	var section = document.createElement("div");
	section.setAttribute("id", 4);

	//appending company name to div
	section.appendChild(info("h1", "id", 4, x));

	//creating image tag for company's img
	var comp_img = document.createElement("img");
	comp_img.setAttribute("src", data[x].Image);
	section.appendChild(comp_img);

	//creating h3 for company booth number
	var comp_booth = info("h3", "id", "company_booth", data[x].Booth)
	section.appendChild(comp_booth);
	comp_booth.insertBefore(info("span","id", "", "Booth No."), comp_booth.lastChild);

	//creating h3 for company information link
	var comp_link = section.appendChild(info("h3", "id", "company_link", ""));
	comp_link.insertBefore(info("span","id", "", "Browse the following link to know more: "), comp_link.lastChild);
	var link = info("a","href", data[x].Link, data[x].Link);
	link .style.textDecoration = "none";
	link .style.color = "black";
	comp_link.insertBefore(link, comp_link.lastChild);
	
	//creating h3 for job type
	var comp_job = info("h3", "id", "company_booth", data[x].JobType)
	section.appendChild(comp_job);
	comp_job.insertBefore(info("span","id", "", "Job Type: "), comp_job.lastChild);
	
	
	//styling the div
	document.getElementById("company").style.display = "inline-block";
	main_div.style.display = "inline-block";
	main_div.style.margin = "70px 5%";
	company_div.style.margin = "70px 5%";
	company_div.style.display = "inline-block",
	company_div.appendChild(section);

	return;
}