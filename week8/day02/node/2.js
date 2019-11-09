var a = 12;
function f () {
    console.log(444)
}
console.log(a)
// 导出
/* exports.a = a;
exports.f = f; */
/* exports = {
    a,f
} */
/* module.exports.a = a;
module.exports.f = f;  */
module.exports = {
    a,f
}