var isDone: boolean = false;

isDone = 1;// fail

var height: number = 6;

height='1';

var name: string = "bob";
name = false;

var list: number[] = [1, 2, 3];

list = 123;

var listString:Array<string> = ["1","2","3"];
listString = [1,2,3];

enum Color {Red = 1, Green = 2, Blue = 4};
var c: Color = Color.Green;

console.log(c);

var notSure : any = 4;
notSure = "maybe a string instead";
notSure = false;

var listAny:any[] = [1, true, "free"];
listAny[1] = [];

function warnUser(): void {
	alert("This is my warning message");
}

interface LabelledValue {
	label : number;
}

function printLabel(labelledObj: LabelledValue) {
	console.log(labelledObj.label);
}

printLabel({label:123});

interface SearchFunc {
	(source: string, subString: string): boolean;
}

var mySearch: SearchFunc;
mySearch = function(src: string, fff: string){
	return false;
}


interface StringArray {
	[index:number]: string;
	length:string
}

var myArray: StringArray;


interface Counter {
	(start: number) : string;
	interval: number;
	reset(): void;
}

var d:Counter;
d(10);
d.reset();
d.interval

class Greeter{
	greeting: string;
	constructor(message: string) {
		this.greeting = message;
	}
	greet() {
		return "Hello, " + this.greeting;
	}
}

var greeter = new Greeter("world");

class Employee {
	fullName: string;
}

var employee = new Employee();
employee.fullName = "Bob Smith";
if(employee.fullName) {
	alert(employee.fullName);
}


var passcode = "secret passcode";
class Employee{
	private _fullName: string;
	get fullName(): string{
		return this._fullName;
	}
	set fullName(newName: string) {
		if(passcode && passcode == "secret passcode") {
			this._fullName = newName;
		} else {
			alert("Error: Unauthorized update of employee!");
		}
	}
}
var employee = new Employee();