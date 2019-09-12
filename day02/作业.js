//---------------------------------------------------------
var n = 10;

function outer() { 
    var n = 15;

    function inner(n) {
        console.log(n) //这里n是个形参，它传了实参，实参是15，所以这个输出是15

        function center() {
            n++;         //这个私有作用域里没有n，向上找n,外面有 形参n  所以n++ 外面的n变成了16
            console.log(n);  //这里是16
        }
        center();
    }
    inner(n);//这里n是15
}
outer();
//输出 15  16 

//---------------------------------------------------------------
var n = 20; 

function outer() {
    ++n;  //函数里没有n变量，去外面找，外面的是20 这个n是21

    function inner() {
        console.log(n++); //这个函数里也没有n,向上找，还是没有，再向上找，window里的n是21 console.log里输出的是函数，不是运算，所以这个还是21

        function center() {
            n += 2;
            console.log(n); //这个函数内也没有n,向上找到window,此时window里的n是22 然后 又加了2 ，所以最后的n 是24
        }
        center();
    }
    inner();
};
outer();
console.log(n)  //这里的n也是24



//----------------------------------------------------
alert(a);   //这里的a由于if条件句里有var 已经声明了，所以是undefined 弹出 字符串的 'undefined'
console.log("a" in window);  // true
if (!("a" in window)) {
    var a = 10;
}
alert(a);  //if条件是false，所以里面的a不会被赋值，所以a还是undefined  所以还是会弹出 字符串的 'undefined'

console.log(fn);    //这里 fn虽然之前没有声明，但是在if判断句里的函数也会变量提升，并且既声明又定义 所以 这里 会输出一个 fn函数
if (9 == 8) {
    function fn() {
        alert(2);  //这里 函数没有被调用，条件句又不成立，不弹出任何东西
    }
}
//    ---------------------------------
f = function () { 
    return true
};
g = function () {
    return false
};
(function () {
    console.log(g); //函数内有g变量，不去上级找，这里 输出  g这个函数 里面return 是true
    if (g() && [] == ![]) {
        f = function f() {  // 这里 的f 是个变量 函数里没有f这个变量，它去上级找，于是这个f就替换了外面的f
            return false
        };
    }

    function g() {
        return true
    };
})();  
alert(f());  // false
alert(g()) // false

// ==========================================
var x = 5;

function fn() {
    return function (y) {
        console.log(y + (++x));
    }
}
var f = fn(6); // 这时 f是fn函数里的return后面的函数
f(7); // 这时 就是return后面函数的调用 7 + 6 = 13
fn(8)(9); //这还是 return后面的函数的调用 但是window里的x已经变成 6了，传入实参9 ， y = 9; x = 6 ;  16
f(10);  //这里就是返回return 后面的函数 y 是10    x 是window里的x，这时是 7 7+1 是8     18
console.log(x);  //8

//================================================
var x = 0,// 2
    y = 1;  //这个y也进行了变量提升

function fn() {   // 这个fn指向一个 函数的堆内存
    x += 2;  //更改window里的x  变成 2
    fn = function (y) {  
        console.log(y + (--x)); 
    };  //这个fn变量 在 fn(3) 之后，就不指向上一个fn函数地址了，指向这个函数地址 
    console.log(x, y);//2，1
}
fn(3);  //  2,1
fn(4);  //  这时fn 不是上一行的fn了，而是 里面的那个fn()  4 + (--2) = 5  同时又改变了window里的x的值 x的值是1
console.log(x, y); //1，1

//=================================================
function fn() {
    var i = 5;
    return function (n) {  //return 后面不进行变量提升
        console.log(n * (--i))
    }
}
var f = fn();
f(10); //40  函数调用后会清空栈内存 清空 形参 实参
fn()(10); //40
fn()(20);//80
f(20);// 这里没有调用函数fn,所以 i的值还保持上一次的4 所以是 20*3  60

//==============================================
var i = 2;// 3 2 4 3 4

function fn() {
    i += 2;  //把window里的i变为4  
    return function (n) {
        console.log(n + (--i));  //这里i又减去1---> 3   2
    }
}
var f = fn();// f 是fn函数运行的结果，f(3) 不执行fn()  fn() 是在这里执行了一次，下面的f()都不再执行fn()了
f(2); // 5  2+3
f(3); // 5
fn()(2); // 5
fn()(3); // 7
f(4); //  7

// ==================================================
var n = 10; 

function fn() {
    var n = 20;

    function f() {
        n++;
        console.log(n);
    }
    f();
    return f;
}
var x = fn();   //return f 这个函数
x(); //21
x();// 22 23
console.log(n); //10