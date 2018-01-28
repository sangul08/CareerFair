<script>
var today = new Date();
//expires in a year....
var expiry = new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000);

function getCookieVal (offset) {
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1) { endstr = document.cookie.length; }
	return unescape(document.cookie.substring(offset, endstr));
}

function GetCookie (name) {
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg) {
			return getCookieVal (j);
			}
		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0) break; 
		}
	return null;
}

function DeleteCookie (name,path,domain) {
	if (GetCookie(name)) {
		document.cookie = name + "=" +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		"; expires=Thu, 01-Jan-70 00:00:01 GMT";
		}
}

function SetCookie (name,value,expires,path,domain,secure) {
  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}
function validateEmail()
      {
         var email = document.getElementById('user_data').email.value;
         at = email.indexOf("@");
         dot = email.lastIndexOf(".");
         console.log(at);
		 console.log(dot);
         if (at < 1 || ( dot - at < 2 )) 
         {
            alert("Please enter correct email ID")
            document.getElementById('user_data').email.focus() ;
            return;
         }
      }
function clickMe() {
	//validation
	//check if name and email have been entered
	if( document.getElementById("user_data").name.value == "" || document.getElementById("user_data").email.value == "")
         {
            alert( "Please provide your complete information!" );
            return;
         }
	//check if one of the checkboxes have been selected
	var count = 0;
	var auth = document.getElementsByName('Auth');
			for(var i=0; i< auth.length; i++){
				if(auth[i].checked){
					count=1;
				}
			}
				if(count != 1) {
					alert( "Please check 'Yes' if you require US Authorization othwise check 'No'!" );
				}
	//name validation
	if(document.getElementById("user_data").name.value = 
	//email validation
	var email = document.getElementById('user_data').email.value;
         at = email.indexOf("@");
         dot = email.lastIndexOf(".");
         console.log(at);
		 console.log(dot);
         if (at < 1 || ( dot - at < 2 )) 
         {
            alert("Please enter correct email ID")
            document.getElementById('user_data').email.focus() ;
            return;
         }
	if(window.localStorage) {
		if(name) {
			var user_name = localStorage.getItem('name', name);
			document.getElementById('name').value = user_name;
			var user_email = localStorage.getItem('email', email);
			document.getElementById('email').value = user_email;
		}
		else {
			var user_name = document.getElementById("name");
			var user_email = document.getElementById("email");
			for(var i=0; i< auth.length; i++){
				if(auth[i].checked){
					localStorage.setItem('auth', auth[i].value);
				}
			}
			console.log(user_name.value);
			console.log(user_email.value);
			localStorage.setItem('name', user_name.value);
			localStorage.setItem('email', user_email.value);
		}
	}
	else {
		var username = GetCookie('name');
		if(username != "" && username != null){
			var name = document.getElementById("name");
			var email = document.getElementById("email");
			var auth = document.getElementsByName('Auth');
			console.log(name);
			console.log(email);
			for(var i=0; i< auth.length; i++){
				if(auth[i].checked){
					SetCookie('auth', auth[i].value);
				}
			}
			SetCookie('name', name.value);
			//document.write('<h2>Welcome, '+ GetCookie('name')+ "! This is your first visit</h2>");
			SetCookie('email', email.value);
		}	
		else{
			document.write('<h2>Welcome, '+ GetCookie('name')+ '</h2>');
		}
	}
}
function init() {

if(window.localStorage) {
			if(localStorage.getItem('name') != null) 
			{
				var user_name = localStorage.getItem('name', name);
				document.getElementById('name').value = user_name;
				var user_email = localStorage.getItem('email', email);
				document.getElementById('email').value = user_email;
			}
		}
}
</script>
</head>
<body onload="init()">
<form id="user_data" method="" action="">
  <label>Name:</label>
  <input type="text" name="name" class="stored" value="" id="name">
  <label>Email:</label>
  <input type="text" name="email" class="stored" value="" id="email">
  <label>Do you require US Sponsorship:<label>
  <input type="radio" name="Auth" value="1">Yes
  <input type="radio" name="Auth" value="2">No
  <input type="button" value="Submit" onclick="clickMe()">
</form>


</body>
</html>