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

interface Friend{
	name: string;
	favoriteColor?: string;
}

function add(friend: Friend) {
	var name = friend.name;
}

var fr: Friend = {
	name: "Jill",
	favoriteColor: "green"
}

add({name:"Fred"});
add(fr);
add({favoriteColor: "blue"});//Error

interface JQuery {
	text(content: string);
}

interface JQueryStatic {
	get(url: string, callback: (data: string) => any);
	(query: string): JQuery;
}

declare var $: JQueryStatic;

$.get("http://mysite.org/divContent",function(data: string){
	$("div").text(data);
})

var fi: {
	(): string;
};

var sameType: () => string = fi;