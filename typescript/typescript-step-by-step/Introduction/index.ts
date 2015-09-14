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

interface Point{
	x: number;
	y: number;
}

function getX(p: Point){
	return p.x;
}

class CPoint{
	x: number;
	y: number;
	constructor(x: number, y: number){
		this.x = x;
		this.y = y;
	}
}

getX(new CPoint(0, 0))

getX({x:0, y:0, color:"red"});

getX({x: 0});//Error

function mal(a: number, b: number){
	return a * b;
}