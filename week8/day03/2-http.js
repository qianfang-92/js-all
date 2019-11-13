let http = require('http');
let url = require('url');
let {readFile} = require('./promiseFs');

let server = http.createServer((req,res)=>{
    // console.log(req);
    //req.headers 请求头信息
    // cors跨域
    /* res.setHeader('Access-Control-Allow-Origin','http://www.baidu.com');
    res.setHeader('Access-Control-Allow-Credentials','true')
    res.setHeader('Set-Cookie','qqq=888');
    // 跨域种植cookie在application中没有体现
    res.setHeader('Access-Control-Allow-Method','GET'); */
    let str = '';
    req.on('data',function (chunk) {
        // 正在接收请求体  流体的形式
        str += chunk;
    });
    req.on('end', function () {
        // 接收请求体完成
        console.log(str)
    })
    res.writeHead(200,{
        'Access-Control-Allow-Origin' : '*'
    })
    res.end('999');
});


// 为了兼容端口出错
let port = 8001;
let init = true;
function listen () {
    let cb = null;
    if (init) {
        init = false;  // 为了使 server的listen只绑定一个函数
        cb = function () {
            console.log('服务起于 '+port);
        }
    }
    server.listen(port,cb);
}
listen();
server.on('error',(e)=>{
    if (e.code === 'EADDRINUSE') {
        // 代表上个端口被占用了
        port++;
        listen();
    }
})

/*
    http 怎么起服务？
        怎么获取前端数据（路径 参数）
        怎么设置响应头（cors跨域的设置）
        端口的占用的处理
        后端的响应 res.end(给前端的信息)

*/