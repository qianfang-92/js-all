function Fn() { 
    this.x = 100;
    this.y = 200;
    this.getX = function () {
        console.log(this.x);
    }
}
Fn.prototype = {
    y: 400,
    getX: function () {
        console.log(this.x);
    },
    getY: function () {
        console.log(this.y);
    },
    sum: function () {
        console.log(this.x + this.y);
    }
};
var f1 = new Fn;
var f2 = new Fn;
console.log(f1.getX === f2.getX);// false
console.log(f1.getY === f2.getY);//true
console.log(f1.__proto__.getY === Fn.prototype.getY);//true
console.log(f1.__proto__.getX === f2.getX);//fasle
console.log(f1.getX === Fn.prototype.getX);//false
console.log(f1.constructor);//  Object   //因为FN的原型对象更改了地址，里面没有constructor了
console.log(Fn.prototype.__proto__.constructor);// Object
f1.getX();// 100  这里this是f1
f1.__proto__.getX();// 这里的this 是 f1._proto_    输出 f1._proto_.x  没有x，就向上找，还是没有 undefined
f2.getY();//这里的this是f2  200
Fn.prototype.getY();// 这里this是Fn.prototype  400
f1.sum();//300  这里 this是f1
Fn.prototype.sum();// 这里this是Fn.prototype     NaN

/* 第二题*/
function Foo() {
    getName = function () {console.log(1);};
    return this;
}
Foo.getName = function () {console.log(2);}; 
Foo.prototype.getName = function () {console.log(3);};
var getName = function () {console.log(4);};
function getName() {console.log(5);}

Foo.getName();
getName();
Foo().getName(); 
getName();
var a = new Foo.getName(); // 
var b = new Foo().getName();
var c = new new Foo().getName();
console.log(a,b,c);

// 第三题
function Person() {
    this.name = 'zhufeng'
};
Person.prototype.getName = function () {
    console.log(this.name)
    console.log(this.age)
};
Person.prototype.age = 5000;

var per1 = new Person;
per1.getName();
per1.age = 9;
per1.getName();
console.log(per1.age);
var per2 = new Person;
console.log(per2.age);
