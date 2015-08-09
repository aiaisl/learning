var Txt = function(){
	this.fs = require('fs');
};
Txt.prototype.readTxt = function(file, content) {
	var fileReadStream = this.fs.createReadStream(file,{
	  flags : 'r',
	  encoding : 'utf-8',
	  mode : 0666
	});
	var i = 0;
	var str = '';
	var addTxtNode = function(str) {
		var txtNode = document.createTextNode(str);
		content.appendChild(txtNode);
		str = '';
	}
	fileReadStream.on('data',function(data){
		str = str + data;
		if (i % 10 == 0) {
			addTxtNode(str);
		}
		i++;
	});
	fileReadStream.on('end',function(){
		addTxtNode(str);
	});
}
var remote = require('remote');
function reload() {
	remote.getCurrentWindow().reload();
}
window.onload = function(){
	document.getElementById('reload').addEventListener('click', function(){
		reload();
	});
}
var electron = angular.module('electron', ['ngRoute']);
electron.controller('MainController', ['$scope', function($scope){
	$scope.txt = "123";
	var dialog = remote.require('dialog');
	$scope.openDirectory = function(){
		var directories = dialog.showOpenDialog({
			properties: ['openDirectory', 'multiSelections' ]
		});
	};

	$scope.openFile = function(){
		var file = dialog.showOpenDialog({
			properties: [ 'openFile', 'multiSelections' ],
			filters: [
				{ name: 'Images', extensions: ['jpg', 'png', 'gif'] },
				{ name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
				{ name: 'Custom File Type', extensions: ['txt'] }
			]
		});
		var txt = new Txt();
		txt.readTxt(file[0], document.getElementById('txt'));
	};

	$scope.showErrorBox = function(){
		dialog.showErrorBox('title', 'content');
	}

	$scope.showMessageBox = function(){
		var w = remote.getCurrentWindow();
	    var chosen = dialog.showMessageBox(w, {
	      type: 'question',
	      buttons: ['Close'],
	      message: 'Window is not responsing',
	      detail: 'The window is not responding. Would you like to force close it or just keep waiting?'
	    });
	    //if (chosen == 0) w.destroy();
	}
}]);