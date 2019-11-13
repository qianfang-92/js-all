let express = require('express');
let app = express();
// let bodyParser = require('body-parser');
let qs = require('qs');
let {readFile,writeFile} = require('./promiseFs');
app.listen(8080, function () {
    console.log('服务起于8080')
})

app.use((req,res,next)=>{
    // 这个中间件是把读取的数据放到req上，这样下边的接口就都可以通过req获取要用的数据了
    readFile('./package-lock.json').then(data=>{
        // 读写都是字符串
        data = JSON.parse(data.toString());
        req.data = data.dependencies;
        next() ; //readFile是个异步的 ，所以我们在读取成功之后,再去执行next
    }).catch(err=>{
        res.status(500); 
    })
})
/* // app.use(bodyParser.json());  // 这种是为了处理json格式的 post请求
// app.use(bodyParser.raw())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({  //专门处理form-date格式的 就像之前的qs.parse一样
    extended:true
})) */
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
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','http://localhost:8000'); // 让后端支持跨域
    res.header('Access-Control-Allow-Credentials',true);
    next();
})

app.get('/list', function (req,res) {
    // req.query  是前端传给后端的参数 
    // type是query中的属性，是用来获取对应的对象的
    let {type} = req.query;  // query是express自带的属性，前端设置的
    let data = req.data;    //data是我们在上边使用中间件加上的
    res.send({
        code:0,
        data:type ? data[type] : data  // 前端给了type 我们就返回对应的属性值，没给就整个对象返回
    })
})

let ary = [];     // 从60到90行 解决的是读写文件时，命令冲突的问题，利用发布订阅，上一次读写之后再进行下一次读写
function f (req,res) {
    readFile('./package-lock.json').then(data=>{
        data = JSON.parse(data);
        Object.assign(data.dependencies.my,req.body);
        return writeFile('./package-lock.json',JSON.stringify(data));
    }).then(data=>{
        res.send({
            code:0,
            data:'success'
        })
        let f = ary.shift();
        f && f();
    },err=>{
        res.status = '500';
        res.send({
            err:err
        })
        let f = ary.shift();
        f && f();
    })
}
let timer = null;
app.post('/add',function (req,res) {
    console.log(req.body);  // 放的是前端post给后台的信息
    ary.push(()=>{f(req,res)});
    
    clearTimeout(timer);
    timer = setTimeout(()=>{
        let f = ary.shift();
        f && f();
    },1000)
})
