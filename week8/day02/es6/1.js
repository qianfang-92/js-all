/* import qqq from './2.js'; // 导入1
console.log(qqq);
qqq.f() */


/* import * as qqq from './2.js'; // 导入2
console.log(qqq) */

import {f,ary,b} from './2.js';  // 导入2  利用对象的解构赋值
f();
// const 声明  在 2.js中  这种引入方式不能修改对应的地址
console.log(ary);
console.log(b)