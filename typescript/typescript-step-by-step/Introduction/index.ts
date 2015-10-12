declare var jquery;

function f(s: string) {
	var i = "hello";
	return i + s;
}
console.log(f('world').length);


function vote(candidate: string, callback: (resule: string) => any) {

}

vote('BigPig', function(resule: string) {
	if (resule === "BigPib") {

	}
})

interface Friend {
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

add({ name: "Fred" });
add(fr);
add({ favoriteColor: "blue" });//Error

interface JQuery {
	text(content: string);
}

interface JQueryStatic {
	get(url: string, callback: (data: string) => any);
	(query: string): JQuery;
}

declare var $: JQueryStatic;

$.get("http://mysite.org/divContent", function(data: string) {
	$("div").text(data);
})

var fi: {
	(): string;
};

var sameType: () => string = fi;

interface Point {
	x: number;
	y: number;
}

function getX(p: Point) {
	return p.x;
}

class CPoint {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

getX(new CPoint(0, 0))

getX({ x: 0, y: 0, color: "red" });

getX({ x: 0 });//Error

function mal(a: number, b: number) {
	return a * b;
}

class BankAccount {
	balance = 0;
	constructor(initially: number) {
		this.balance = initially;
	}
	deposit(credit: number) {
		this.balance += credit;
		return this.balance;

	}
}

class CheckingAccount extends BankAccount {
	constructor(balance: number) {
		super(balance);
	}
	writeCheck(debit: number) {
		this.balance -= debit;
	}
}

class Accessor {

}
function attr(name: string): string;
function attr(name: string, value: string): Accessor;
function attr(map: any): Accessor;
function attr(nameOrMap: any = "wind", value?: string): any {
	if (nameOrMap && typeof nameOrMap === "string") {

	} else {

	}
}
attr("myName", "hi");

interface Comparable {
	localeCompare(other: any): number;
}

function compare<T extends Comparable>(x: T, y: T): number {
	if (x == null) {
		return y == null ? 0 : -1;
	}
	if(y == null) {
		return 1;
	}
	return x.localeCompare(y);
}

class Messager {
	message = "Hello World";
	constructor();
	constructor(message: string)
	constructor(message: string = "a") {
		this.message = message;
	}
	start() {
		setTimeout(()=>{
			alert(this.message);
		}, 3000);
	}
}
var message = new Messager();

message.start();