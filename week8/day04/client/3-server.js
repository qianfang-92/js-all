// 实现一个登陆的功能

let express = require('express');
let {readFile,writeFile} = require('./promiseFs');
let app = express();
let qs = require('qs');
let session = require('express-session');
app.listen(8000, function () {
    console.log('后端接口服务起于8000')
})

//解决跨域
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','http://127.0.0.1:3000'); // 让后端支持跨域
    res.header('Access-Control-Allow-Credentials',true);
    next();
})

// 把post请求参数转成普通对象存放到req.body上
app.use((req,res,next)=>{
    let str = '';
    req.on('data',(chunk)=>{
        str += chunk;
    })
    req.on('end',()=>{
        let obj = {};
        try {
            obj = JSON.parse(str);
        } catch (error) {
            obj = qs.parse(str);
        }
        req.body = obj; //前端给的请求体；已经处理为对象了
        next();
    })
})

// 把读取数据的操作放到中间件上
app.use((req,res,next)=>{
    readFile('./user.json').then(data=>{
        req.data = JSON.parse(data);
        next()
    }).catch(err=>{
        // 读取失败，给前端状态码
        res.status = '500';
        res.send('')
    })
})

app.post('/reg',function (req,res) {
    // 实现注册接口

    let {username,password} = req.body;
    let data = req.data;
    let bol = data.some(item=>{
        return item.username == username;
    });
    // bol 是 true时，说明用户名已经存在
    if (bol) {
        res.send({
            code:1,
            message:'already has this username'
        })
        return;
    }
    data.push(req.body);
    writeFile('./user.json',JSON.stringify(data)).then(data=>{
        // 写入成功
        res.send({
            code:0,
            data:'success'
        })
    }).catch(err=>{
        res.status = '500'
        res.send({
            data:'fail'
        })
    })
})

app.post('/login',function (req,res) {
    let {username,password} = req.body;
    let bol = req.data.some(item=>{
        return item.username == username && item.password == password
    })
    if (bol) {
        // 登陆成功，需要后端给前端种植一个cookie 来判断用户是否处于登陆状态
        session({
            name:"hello",
            secret:"myqqq",
            resave:false,
            saveUninitialized:false,
            cookie:{
                maxAge:1000*60*60
            }
        })
        res.send({
            code:0,
            data:{
                name:username
            }
        })
    } else {
        res.send({
            code:2,
            message:'用户名密码错误'
        })
    }
})