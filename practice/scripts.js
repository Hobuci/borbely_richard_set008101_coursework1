function helloFunction(){
	alert('Hello User!');
}

var i = 1;
function addMessage(){
	document.getElementById("content2").innerHTML = "Count:  " + i;
	i++;
}

var colors = [ "red", "blue", "green", "yellow", "orange" ];
var c = 0
function changeColor(){
	document.getElementById("content2").style.backgroundColor = colors[c];
	if(c == 4) { c = 0; } else { c++; }
}