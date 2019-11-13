let http =require('http');
let url = require('url');
let {readFile} = require('./promiseFs');
http.createServer((req,res)=>{
    let {pathname,query} = url.parse(req.url,true); // true 把query上的对象变成字符串
    switch (pathname) {
        case '/':
            readFile('./static/index.html').then(data=>{
                res.end(data)
            }).catch(err=>{
                res.statusCode = '500';
            })
            // res.end('hello world');
            break;
        case '/favicon.ico':
            readFile('./static/favicon.ico').then(data=>{
                res.end(data);
            }).catch(err=>{
                res.end('777');
            })
            break;
        case '/1.js':
            readFile('./static/1.js').then(data=>{
                res.end(data)
            })
            break;
        case '/1.css':
            readFile('./static/1.css').then(data=>{
                res.end(data);
            })
            break;
        case '/5.jpg':
            readFile('./static/5.jpg').then(data=>{
                res.end(data);
            })
            break;
        default:
            res.end('123244434');
            break;
    }
    // res.end('666');
}).listen(8000,()=>{
    console.log('服务起于 8000端口')
})