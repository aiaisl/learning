function add(x: number, y:number) : number {
	return x + y;
}

var myAdd = function(x: number, y:number) :number {
	return x + y;
}


var myAdd = function(x: number, y:number):number{
	return x+ y;
}

var myAdd: (vaseValue: number, increment: number)=>number = 
	function(x, y) {
		return x + y;
	}
myAdd()