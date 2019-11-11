let http = require('http');
http.createServer(function(req,res){
    if (req.url == '/love' ) {
        res.end('999')
    } else {
        res.end('888')
    }
    // res.end('444')
}).listen(8000, function () {
    console.log('服务起于8000 端口')
})
