console.log(a);
var a = 12;

function fn() {
    console.log(a);
    a = 13;
}
fn();

//-------------------------------------

console.log(a, b, c);
var a = 10,
    b = 20,
    c = 30;

function f(a) {
    console.log(a, b, c);
    var b = a = c = 100;
    console.log(a, b, c)
}
f(10, 20);
console.log(a, b, c);

//-------------------------------------

a();
var a = c = function () {
    console.log(2)
};
a();
function a() {
    console.log(1)
};
a();

//---------------------

var foo = 1;

function bar() {
    if (!foo) {
        var foo = 10;
    }
    console.log(foo);
}
bar();

//-------------------------------------

function a() {
    console.log(1)
};
function c() {
    console.log(2)
}
(function (b) {  //a是全局的a,b是私有的b,都指向同一个地址  然后变量提升，b变成4函数，不是
    b(); //4
    c(); //2
    var b = c = function a() {
        console.log(3)
    };

    function b() {
        console.log(4)
    }
    b(); //3
})(a);
c();//3

//---------------------------
var n = 5;

function a(n) {
    n++;
    n = 10;
    b();

    function b() {
        n++;
        alert(n);//11
    };
}
a();
alert(n);//5

//---------------------------------

var n = 10;

function fn() {
    var n = 20; //21  22 23
    function f() {
        n++;
        console.log(n)
    };
    f();
    return f
}
var f = fn();
f();
f();
console.log(n);//10

//======================

var i = 1;

function fn(i) {
    return function (n) {
        console.log(n + (++i))
    }
}
var f = fn(2);  // i=2  3
f(3); //3+3 =6
fn(5)(6) //i=5 6+6 12  i=6
fn(3)(2)//i=3  2+4  6  i=4
f(4);//i=3  4+4 8

//--------------------

let i = 1;
let fn = function (n) {
    i *= 2;
    return function (m) {
        n++;
        i += n + m;
        console.log(i);
    }
};
let f = fn(2);//n=2  i= 2 
f(3); // m =3  n = 3  n+m =6 i=8 
fn(2)(3); // n=2 i=16 m=3 n=3 i=22
f(4);//n=4 m=4 i=22 i=30
f(5); //n=5 m=5 i=40

//-----------------------------this
var x = 1,
    y = 2;
function fn(x) {
    this.x *= (++x);
    fn = function (y) {
        this.y *= (--y);
        console.log(x + y);
    }
    console.log(x + y); //4+2  6
    return fn;  //私有的y=4 没有. this.y是window的y  全局 的y=6  私有的y=3 x+y  =4+3  7 
}
fn(3)(4); //私有x=3  上级i = 4   私有的x=4,把全局的fn地址改变了   
console.log(x + y); //全局的x =4 全局的y=6   10

//-------------------------------------
var x = 1;//2
var obj = { x: 2 }; //  12
obj.fn = (function (x) { //私有x=2  12
    this.x *= x++; //this.x是window的x，是1 变成2   私有x变成3  6
    return function (y) {
        x += y;
        this.x *= ++x;
        console.log(x);
    }
})(obj.x);
var fn = obj.fn;  // 全局的fn和obj的fn指向同一个函数地址
obj.fn(2); //  私有y=2 x =3 x = 5 obj的x变成 2*6 12  私有的x变成 6   
fn(1); // x = 6 y =1  x=7  this.x是window的x，是2  全局的x=16  私有的x =8
console.log(obj.x, x); //obj.x是12 全局的x是16

//-------------------------------------
var x = 2;//4 16
var y = {
    x: 3, //15
    z: (function (x) {//传参 私有的x是2
        this.x *= x; //自执行函数，this是window 
        x += 2; //私有的x变成4  7
        return function (n) {
            this.x *= n;
            x += 3;
            console.log(x);
        }
    })(x)
};
var m = y.z;
m(4); // 私有的n =4 ，this是window  私有的x是 7 
y.z(5); //this是y 私有n是5， 私有的x是10  
console.log(x, y.x);  // 16，15
