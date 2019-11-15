let express = require('express');
// express是nodeJs的一个库，相当于JS的jQuery
let qs = require('qs');

let app = express();
app.listen(8000, function () {
    console.log('服务起于8000端口');
}) // 起服务完毕

app.use((req,res,next)=>{
    req.qqq = 123455;
    next();
})
app.use((req,res,next)=>{
    res.header({'ddd':'eee'});
    next();
})
app.use(express.static('./static')); // express.static 是 express提供的一个访问静态页面的方法；