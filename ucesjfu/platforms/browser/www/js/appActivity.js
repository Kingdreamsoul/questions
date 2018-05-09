//***adapted from practical in week2***// 
// load the leaflet map
var mymap
mymap = L.map('mapid').setView([51.52421, -0.13418], 15.5);
// load the tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                       maxZoom: 18,
                       attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
                                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                         id: 'mapbox.streets'
                 }).addTo(mymap);
				 


//clear the content or values user typed in the box, not to drop data from database				 
function allClear() {
	document.getElementById("questionForm").reset();
 };

 

function loadQuestions() {
// call the getQuestions code
// keep the alert message so that we know something is happening
alert("Loading questions on map");
getQuestions();
}
// create a variable that will hold the XMLHttpRequest() - this must be done outside a function sothat all the functions can use the same variable
var client;
// and a variable that will hold the layer itself – we need to do this outside the function so that we can use it to remove the layer later on
//create a global variable for the downloaded question data
var questiondata;
var questionslayer;
// create the code to get the data about using an XMLHttpRequest
function getQuestions() {
 client = new XMLHttpRequest();

client.open('GET','http://developer.cege.ucl.ac.uk:30276/getGeoJSON/questions/geom');
 client.onreadystatechange = questionsResponse; 
 client.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function questionsResponse() {
 // this function listens out for the server to say that the data is ready - i.e. has state 4
 if (client.readyState == 4) {
 // once the data is ready, process the data
 questiondata = client.responseText;
 loadQuestionslayer(questiondata);
 }
}



// convert the received data - which is text - to JSON format and add it to the map
//also include a pop-up that shows the question id and question
function loadQuestionslayer(questiondata) {
 // convert the text to JSON
 var questionsjson = JSON.parse(questiondata);
 // add the JSON layer onto the map - it will appear using the default icons
questionslayer = L.geoJson(questionsjson,
{
pointToLayer: function (feature, latlng)
{return L.marker(latlng).bindPopup("<b>"+feature.properties.questionid+". "
+feature.properties.question+"</b>" );
},
}).addTo(mymap);
 // change the map zoom so that all the data is shown
mymap.fitBounds(questionslayer.getBounds());
}




//create the code to make the questions invisible on the map 
//users may have this request since the base map may be hidden by the exsiting intensive questions,
//which may affect the locating of questions
function removeQuestions() {
alert("Question data will be removed on map");
mymap.removeLayer( questionslayer );
}



// create a custom popup to obtain the location of questions for geom(i.e.latitude and longitude) uploading
var popup = L.popup();
// create an event detector to wait for the user's click event and then use the popup to show them where they clicked
// note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes - the Leaflet API does this for you
function onMapClick(e) {
popup
.setLatLng(e.latlng)
.setContent("You can set question at " + e.latlng.toString())
.openOn(mymap);
}
// now add the click event detector to the map
mymap.on('click', onMapClick);