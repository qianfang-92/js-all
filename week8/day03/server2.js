let http =require('http');
let url = require('url');
let {readFile} = require('./promiseFs');
http.createServer((req,res)=>{
    let {pathname,query} = url.parse(req.url,true); // true 把query字符串变成对象
    if (pathname == '/') {
        readFile('./static/index.html').then(data=>{
            res.end(data);
        }).catch(err=>{
            res.statusCode = '500';
        })
    } else {
        if(/\.\w+/.test(pathname)) {
            // 有后缀 走的是静态资源
            readFile('./static'+pathname).then(data=>{
                res.end(data);
            }).catch(err=>{
                res.statusCode = '500';
                readFile('./static/500.html').then(data=>{
                    res.end(data);
                })
            })
        } else {
            // 走接口
            getData(pathname, query, res)
        }
    }
    // res.end('666');
}).listen(8000,()=>{
    console.log('服务起于 8000端口');
})

// /list  type=dev  返回 dev.json的内容 type=pro 返回 pro.json内容

function getData(pathname, query, res) {
    query.type = query.type || 'dev';
    if (pathname == '/list') {
        readFile('./json/'+query.type+'.json').then(data=>{
            res.end(data);
        }).catch(err=>{
            res.end('error');
        })
    }
}
