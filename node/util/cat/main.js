var head = require('./head');

exports.cat = {
	notice: function(){
		console.log("cat");
	},
	wo: function(){
		head.wo();
	}
}