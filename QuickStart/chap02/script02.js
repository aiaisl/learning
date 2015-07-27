window.onload = writeMessage;

function writeMessage() {
	document.getElementById("helloMessage").innerHTML = "Hello, world!";
}

function saySomething () {
	alert("Four score and seven years ago");
}
saySomething();