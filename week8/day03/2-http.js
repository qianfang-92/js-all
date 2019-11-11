let http = require('http');
let url = require('url');
let {readFile} = require('./promiseFs');

let server = http.createServer((req,res)=>{
    // cors跨域
    res.setHeader('Acess-Control-Allow-Origin','*');
    res('999');
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