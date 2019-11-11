let path = require('path');
// path 一般用来生成绝对路径 

let url = require('url');
// url.parse 后台一般用来获取url上面的参数  第二个参数 true时 query 是一个参数

/* let str = 'http://baidu.com?a=12&b=14#qqq';
console.log(path.parse(str)) */
// console.log(path.resolve('./es6'));  // es6的绝对路径
// console.log(path.resolve(__dirname,'./qqq'))

let str = 'http://baidu.com?a=12&b=14#qqq';
console.log(url.parse(str,true).query.a)