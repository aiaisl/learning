var webdriverio = require('webdriverio');
var assert = require('assert');
var options = { desiredCapabilities: { browserName: 'chrome' } };
var client = webdriverio.remote(options);
/*
client
	.init()
	.url("http://localhost:8080/chap09")
	.setValue('#nameField', 'aiaisl')
	.submitForm('#cookieForm')
	.getCookie('userName').then(function(cookies){
		assert(cookies.value === 'aiaisl');
	})
	.deleteCookie('userName')
	.end();
*/
client
	.init()
	.url("http://localhost:8080/")
	.setValue("#textArea","hello")
	.submitForm('form').then(function(){
		client.getText('body>p').then(function(value){
			console.log(value);
		})
		.end();
	})
