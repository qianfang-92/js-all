var obj = {
    name: " 小明",
    skill: ["css3", "html5", "es6", "react", "angular"],
    say: function () {
        var _this = this;
        for (let i = 0; i < this.skill.length; i++) {
            setTimeout((function(){
                console.log(_this.name + '会' + _this.skill[i] )
            }),1000*(i+1))
        }
    }
}
obj.say(); 
// 上述函数执行的时候  一秒一输出   小明 会 css3 ； 小明会 html5 ; ....



var name = '中国',
    age = 5000;
function Person() {
    getName = function () {
        console.log(this.name)
    };
    this.name = 'zfpx';
    this.age = 9;
}
Person.name = '珠峰';
Person.getName = function () {
    console.log(this.name);
};
Person.prototype.getName = function () {
    console.log(this.name);
};
var obj = {
    name: '培训',
    f: Person
};
var per = new Person();//name :'zfpx',age:9 ,getName  :12
per.getName = function () {
    console.log(12)
};
var per2 = new Person();  //name :'zfpx',age:9
obj.f(); // obj.name :'zfpx',age:9   undefined
Person();//  window:name :'zfpx',age:9 
per.getName();//  12
per2.getName();// 'zfpx'




function Fn(name,age){
    name ? this.name = name : null
    age ? this.age = age : null ;
}
Fn.prototype.eat = function () {
    console.log('吃香蕉');
    console.log(this.name)
}
var f1 = new Fn('zf',10);
f1.eat = function(){
    console.log('吃苹果');
    console.log(this.age);
}
Fn.prototype = f1;

var f2 = new Fn('xm');
f2.eat();//'吃苹果'，10
f1.eat();//'吃苹果'，10
f2.__proto__.eat();//'吃苹果'，10
f1.__proto__.eat();//'吃香蕉'，undefined
f1.constructor === f2.constructor;// true