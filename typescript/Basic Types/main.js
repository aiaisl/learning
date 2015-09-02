var isDone = false;
isDone = 1; // fail
var height = 6;
height = '1';
var name = "bob";
name = false;
var list = [1, 2, 3];
list = 123;
var listString = ["1", "2", "3"];
listString = [1, 2, 3];
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Green;
console.log(c);
var notSure = 4;
notSure = "maybe a string instead";
notSure = false;
var listAny = [1, true, "free"];
listAny[1] = [];
function warnUser() {
    alert("This is my warning message");
}
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
printLabel({ label: 123 });
var mySearch;
mySearch = function (src, fff) {
    return false;
};
var myArray;
var d;
d(10);
d.reset();
d.interval;
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
})();
var greeter = new Greeter("world");
var Employee = (function () {
    function Employee() {
    }
    return Employee;
})();
var employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}
