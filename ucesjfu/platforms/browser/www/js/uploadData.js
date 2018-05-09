//The alert for 'fill in all fields' is modified from https://www.formget.com/how-to-create-pop-up-contact-form-using-javascript/
//Alert can avoid null value or data with incorrect format (e.g. latitude and longitude)
//which will affect the viewing of questions or cause error so that data insertion to database will fail
function startDataUpload() {
	if (document.getElementById('question').value == "" || document.getElementById('answer1').value == "" ||
	document.getElementById('answer2').value == ""|| document.getElementById('answer3').value == ""|| 
	document.getElementById('answer4').value == ""|| document.getElementById('latitude').value == ""|| 
	document.getElementById('longitude').value == "") {
alert("Please Fill All Fields !");
}
if (isNaN(document.getElementById('latitude').value||document.getElementById('longitude').value )){
alert("Please Fill the Latitude and Longitude by reasonable numbers");
}
if(document.getElementById('ra1').checked==false&&document.getElementById('ra2').checked==false
	&&document.getElementById('ra3').checked==false&&document.getElementById('ra4').checked==false){
alert("Please check one circle button!");
}else {
	alert ("start data upload");

//****adapted from practical 6 and 7****//
//get the value in text boxes
	var question = document.getElementById("question").value;
	var answer1 = document.getElementById("answer1").value;
	var answer2 = document.getElementById("answer2").value;
    var answer3 = document.getElementById("answer3").value;
	var answer4 = document.getElementById("answer4").value;
	var latitude=document.getElementById("latitude").value;
	var longitude=document.getElementById("longitude").value;
	alert(question);
	
//define poststring so that it can be parameters for the URL to send values to the server			
	var postString = "question="+question +"&answer1="+answer1+"&answer2="+answer2+"&answer3="+answer3+"&answer4="+answer4;
	postString=postString+"&latitude="+latitude+"&longitude="+longitude;
		


// now get the radio button values
	if (document.getElementById("ra1").checked) {
 		var correct_answer=document.getElementById("ra1").value;
		postString=postString+"&correct_answer="+correct_answer
	}
	if (document.getElementById("ra2").checked) {
 		var correct_answer=document.getElementById("ra2").value;
		postString=postString+"&correct_answer="+correct_answer
	}
    if (document.getElementById("ra3").checked) {
 		var correct_answer=document.getElementById("ra3").value;
		postString=postString+"&correct_answer="+correct_answer
	}
	if (document.getElementById("ra4").checked) {
 		var correct_answer=document.getElementById("ra4").value;
		postString=postString+"&correct_answer="+correct_answer
	}
	
//pass the data to processData function 	
	processData(postString);
}
}

var client;

//using URL 'http://developer.cege.ucl.ac.uk:30276/uploadData' to send value to the httpServer
function processData(postString) {
   client = new XMLHttpRequest();
   client.open('POST','http://developer.cege.ucl.ac.uk:30276/uploadData',true);
   client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   client.onreadystatechange = dataUploaded;  
   client.send(postString);
}
// create the code to wait for the response from the data server, and process the response once it is received
function dataUploaded() {
  // this function listens out for the server to say that the data is ready - i.e. has state 4
  if (client.readyState == 4) {
    // change the DIV to show the response
    document.getElementById("dataUploadResult").innerHTML = client.responseText;
    }
}