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
	.url("http://localhost/ngy2/")
	.click('.login-button=登录')
	.setValue('#email', "abcdefg@abc.com")
	.setValue("#pwd", "password")
	.click("#login")
