let express = require('express');
// express 是 nodeJS 的一个库  ；相当于JS的jQuery
let qs = require('qs');

let app = express();
app.listen(8000,function () {
    console.log('服务起于8000端口');
})
// 以上，服务就起完了

// express使用中间件  use没有次数限制，但是有上下关系 
app.use((req,res,next)=>{
    req.qqq = 1233456;
    next();
})
app.use((req,res,next)=>{
    // console.log(req.qqq);
    res.header({'hshs':'fdf'});
    next();
})
app.use(express.static('./static'));  // express.static 是 express提供的一个访问静态页面的方法；

// 下面的get post 提供接口 为静态页面调用
app.get('/list', function (req,res) {
    // 该回调函数只有当前端请求的是 /list这个路径 并且是get 方法时，才会执行
    
    console.log(req.query);
    res.send({
        qqq:req.qqq,
        data:req.query
    })
})
app.post('/add',function (req,res) {
    let str = '';
    req.on('data',function (chunk) {
        // 后端正在接收前端数据
        str += chunk;
    })
    req.on('end',function () {
        let obj = {};
        try {   // 为了使 fetch的和xhr发的请求数据都能变成对象
            obj = JSON.parse(str)  // 把JSON字符串转成对象
        } catch (error) {
            obj = qs.parse(str); // 把search字符串转成 对象
        }
        console.log(obj)
        console.log(str,str.a);
        // console.log(qs.parse(str))
        res.send({
            code:0,
            data:'sucess'
        })
    })
})