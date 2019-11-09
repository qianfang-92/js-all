/* var a = {
    q:123
}
function f () {
    console.log(a);
}
 // 导出1
export default {
    a,f
} */

// 导出2  必须有声明关键字
export var a = {a:123}
export function f() {console.log(a)}
export let b = 12;
export const ary = [1,2,3,4];
b = 13;