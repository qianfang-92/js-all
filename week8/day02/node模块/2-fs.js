// fs是node内模块 用来操作文件的  读写文件
// I/O 操作  input output  IO操作 文件的读写
let fs = require('fs');

//fs readFile执行有三个参数， url 编码格式 回调函数
//                               'utf-8'
/* fs.readFile('./my.js',null,(err,data)=>{ // 涉及回调的时候基本上是异步的
    // 若读取文件失败，则err就会有对应的值，若成功则err为null 
    if(!err) {
        console.log(data.toString())
    } else{
        console.log(err)
    }
        console.log('err',err)
    console.log('data',data.toString())
 }) */
 /* console.log(666)

 let data = fs.readFileSync('./my.js','utf-8');  // 同步的读取文件 不用回调函数
 console.log(data)
 console.log(888) */

 // readFile 异步   ； readFileSync 同步

 //-------------------------------读文件夹 
/*  fs.readdir('../node',null,(err,data)=>{
     if (!err) {
        //  console.log(typeof data);
        data.forEach(item=>{
            fs.readFile('../node/'+item,'utf-8',(e,d)=>{
                if (!e) {
                    console.log(d)
                } else {
                    console.log(e)
                }
            })
        })
     } else {
         console.log(err)
     }
 }) */
/* 
 let data = fs.readdirSync('../node','utf-8'); // 同步
 console.log(data) */

 /* fs.mkdir('./qqq',(err)=>{
     // 创建文件夹
     if(!err) {
         console.log('创建成功')
     } else {
         console.log('创建失败');
     }
 }) */

/*  fs.rmdir('./qqq',(err)=>{
     if (!err) {
         console.log('删除成功')
     } else {
         // 如果文件夹中有文件，会删除失败，不存在对应的文件夹也会删除失败
         console.log('删除失败',err)
     }
 }) */

 /* let data = fs.mkdirSync('./qq');
 console.log(data);   同步 */
// fs.rmdirSync('./qq')
/* fs.mkdir('./qqq',(e)=>{

}) */

/* fs.writeFile('./qqq/1.js','var b = 12','utf-8',(e)=>{
    if(!e) {
        console.log('写入成功')
    } else {
        console.group('写入失败')
    }
}) */

// fs.writeFileSync('./qq/2.js','function f (){}','utf-8');  // 同步
/* console.log(8) 

try {
    fs.writeFileSync('./qqq/2.js','function f (){}','utf-8');
} catch (error) {
    console.log(8)
} */

/* fs.appendFile('./qqq/1.js','\n; var d = 3','utf-8',(e)=>{
    if(!e) {
        console.log('添加成功')
    } else {
        console.log('添加失败')
    }
}) */

function append(url,data) {
    fs.readFile(url,'utf-8',(e,d)=>{
        /* if (!e) {
            fs.writeFile(url,d+data,'utf-8',(e)=>{
                if(!e){
                    console.log('添加成功');
                }
            })
        } else {
            fs.writeFile(url,data,'utf-8',(e)=>{
                if (!e) {
                    console.log('创建成功')
                }
            })
        } */

        d = d || '';
        fs.writeFile(url,d+data,'utf-8',(e)=>{
            console.log('添加成功')
        })
    })
}
// append('./qqq/2.js',';\nvar s = 8;');
/* fs.rmdir('./qqq',(e)=>{
    console.log(e)
}) */

/* fs.unlink('./qqq/1.js',(e)=>{
    console.log(e)
}) // 删除文件 异步  同步使用unlinkSync */

fs.copyFile('./qqq/2.js','./qqq/3.js',(e)=>{
    console.log(e)
})  // 拷贝

// readFile readdir  mkdir rmdir  writeFile appendFile copyFile unlink  

readFile('./qqq','').then()

