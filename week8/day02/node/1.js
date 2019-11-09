// node的模块化 是遵循 commonjs规范的
let qqq = require('./2.js'); // 导入
console.log(qqq);
qqq.f()
// 每一个js文件对于node来说都是一个大闭包
// require  _dirname  _filename  module.exports  exports 这五个变量 属于当前js文件的私有变量
// require 用来导入文件
/*
    module.exports 和 exports 都是用来导出内容的
    _dirname 是当前文件所在文件夹的绝对路径
    _filename 是当前文件的绝对路径
*/
console.log('文件夹路径',__dirname);
console.log('文件路径',__filename)

// npm i less less-loader --save-dev
/*
    npm run 对应的脚本命令 (在package.json的script中对应的属性名)
*/