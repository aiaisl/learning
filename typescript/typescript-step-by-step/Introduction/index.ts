declare var jquery;

function f(s: string){
	var i = "hello";
	return i + s;
}
console.log(f('world').length);


function vote(candidate: string, callback: (resule: string)=> any){
	
}

vote('BigPig', function(resule: string){
	if(resule === "BigPib"){
		
	}
})