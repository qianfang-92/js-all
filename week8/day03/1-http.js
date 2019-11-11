/*  fs 读写文件 
    url.parse获取url上面的参数  
    path.resolve 获取绝对路径
    http 起服务用的 

    __dirname文件夹绝对路径   __filename 文件绝对路径
*/
let http = require('http');  // process.env node全局下的一个属性
let url = require('url');
let {readFile} = require('./promiseFs');
http.createServer((req,res)=>{
    // req require 存放的是请求信息
    // res response 存放的是响应信息
    // 只要前端发送了请求 就会执行该函数  node执行一下就可以了
    // console.log(req.url) 前端的请求路径
    // console.log(req.method) 前端的请求方法
    console.log(url.parse(req.url,true)) // 解析前端路径
    // pathname 是前端给的纯路径  
    // query 是前端在路径上给的参数
    let {pathname,query} = url.parse(req.url,true);
    if (pathname == '/favicon.ico') {
        // 说明前端请求的是小图标
        readFile('./5.jpg').then(data=>{  // 异步的
            res.end(data);
        }).catch(()=>{
            // 读取失败时
            res.statusCode = 404;
            res.statusMessage = 'hello'
        });
        // res.end()
    } else {
        res.end(JSON.stringify(query))
    }
    // res.statusCode = 404;// 给前端的状态码 这里是由于同步异步的问题 才会 ico
    // res.statusMessage = 'hello' // 给前端的状态文本
    // res.end('777'); // 给前端响应的  
}).listen(8001,()=>{
    // 服务启动成功之后会执行该函数
    console.log('服务启动成功 端口是8001');
})