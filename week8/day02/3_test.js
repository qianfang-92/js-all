let my = require('./promiseFs');
// console.log(my);
/* my.unlink('./node模块/qqq/1.js').then((d)=>{
    console.log(d)
},(e)=>{
    console.log(e)
}) */
let p1 = my.unlink('./node模块/qqq/2.js');
let p2 = my.unlink('./node模块/qqq/3.js');
Promise.all([p1,p2]).then((data)=>{
    // 都删除之后，删除qqq文件夹
    console.log('所有文件删除成功');
    return my.rmdir('./node模块/qqq');
}).then((data)=>{
    console.log(data,'删除文件夹成功')
}).catch(err=>{
    console.log('操作失败')
})