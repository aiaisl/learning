var D = {
	show : function(){
		console.log(1);
	},
	describe : function(str, callback){

	},
	is : function(a, b){
		console.log(a == b);
	}
}
module.exports = D;

/*
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});
*/