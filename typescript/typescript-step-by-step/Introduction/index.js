var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function f(s) {
    var i = "hello";
    return i + s;
}
console.log(f('world').length);
function vote(candidate, callback) {
}
vote('BigPig', function (resule) {
    if (resule === "BigPib") {
    }
});
function add(friend) {
    var name = friend.name;
}
var fr = {
    name: "Jill",
    favoriteColor: "green"
};
add({ name: "Fred" });
add(fr);
add({ favoriteColor: "blue" }); //Error
$.get("http://mysite.org/divContent", function (data) {
    $("div").text(data);
});
var fi;
var sameType = fi;
function getX(p) {
    return p.x;
}
var CPoint = (function () {
    function CPoint(x, y) {
        this.x = x;
        this.y = y;
    }
    return CPoint;
})();
getX(new CPoint(0, 0));
getX({ x: 0, y: 0, color: "red" });
getX({ x: 0 }); //Error
function mal(a, b) {
    return a * b;
}
var BankAccount = (function () {
    function BankAccount(initially) {
        this.balance = 0;
        this.balance = initially;
    }
    BankAccount.prototype.deposit = function (credit) {
        this.balance += credit;
        return this.balance;
    };
    return BankAccount;
})();
var CheckingAccount = (function (_super) {
    __extends(CheckingAccount, _super);
    function CheckingAccount(balance) {
        _super.call(this, balance);
    }
    CheckingAccount.prototype.writeCheck = function (debit) {
        this.balance -= debit;
    };
    return CheckingAccount;
})(BankAccount);
var Accessor = (function () {
    function Accessor() {
    }
    return Accessor;
})();
function attr(nameOrMap, value) {
    if (nameOrMap === void 0) { nameOrMap = "wind"; }
    if (nameOrMap && typeof nameOrMap === "string") {
    }
    else {
    }
}
attr("myName", "hi");
function compare(x, y) {
    if (x == null) {
        return y == null ? 0 : -1;
    }
    if (y == null) {
        return 1;
    }
    return x.localeCompare(y);
}
var Messager = (function () {
    function Messager(message) {
        if (message === void 0) { message = "a"; }
        this.message = "Hello World";
        this.message = message;
    }
    Messager.prototype.start = function () {
        var _this = this;
        setTimeout(function () {
            alert(_this.message);
        }, 3000);
    };
    return Messager;
})();
var message = new Messager();
message.start();
