let http = require('http');
let url = require('url');
let {readFile,writeFile} = require('./promiseFs');

let server = http.createServer((req,res)=>{
    console.log(req.method)
    let {pathname,query} = url.parse(req.url,true); //true把query解成一个对象
    let method = req.method.toLocaleLowerCase();
    res.setHeader('Access-Control-Allow-Origin','http://localhost:8000'); // 让后端支持跨域
    // 跨域设置cookie  ：
    //  跨域的源域不能是*  
    //  响应头需要有 credentials属性，
    //  前端允许跨域携带cookie
    //  也可以下面这种写法
    res.writeHead(200,{
        'Access-Control-Allow-Credentials':true,
        // 'Access-Control-Allow-Headers': 'X-Juejin-Src,X-Juejin-Client,X-Juejin-Uid,X-Juejin-Token'
        'set-cookie':'qwer=1234'
    })


    // list get
    // add post
    switch (pathname) {
        case '/list':
            if (method == 'get') {
                readFile('./json/data.json').then(data=>{
                    res.end(data)
                }).catch(err=>{
                    res.statusCode = '500';
                    res.end('');
                })
            } else {
                res.statusCode = '405';
                res.statusMessage = 'method is not allowed';
                res.end('');
            }
            break;
        case '/add':
            if (method == 'post') {
                // 获取前端给的请求体
                let str = '';
                req.on('data',(chunk)=>{
                    str += chunk;
                });
                req.on('end',()=>{
                    console.log(str); // 是前端写给的请求体
                    readFile('./json/data.json').then(data=>{
                        console.log('data',data.toString());
                        let obj = JSON.parse(data.toString());
                        obj.data.push(...JSON.parse(str).a)
                        // obj是增加完数据之后的对象
                        return writeFile('./json/data.json',JSON.stringify(obj))
                    }).then(data=>{
                        res.end(JSON.stringify({code:0,data:'success'}))
                    }).catch(err=>{
                        res.statusCode = '500';
                        res.statusMessage = 'bad system';
                        res.end('');
                    })
                    // res.end('999');
                })
                
            } else {
                res.statusCode = '405';
                res.statusMessage = 'method is not allowed';
                res.end('');
            }
            break;
        default:
            break;
    } 
});
let port = 8000;
function listen () {
    let cb = null;
    if (port == 8000) {
        cb = function () {
            console.log('服务起于 '+port+'端口');
        }
    }
    server.listen(port,cb);
}
listen();
server.on('error',(e)=>{
    if(e.code == 'EADDRINUSE') {
        port++;
        listen();
    }
})

/*
    options请求  跨域请求 请求头是复杂数据类型
*/