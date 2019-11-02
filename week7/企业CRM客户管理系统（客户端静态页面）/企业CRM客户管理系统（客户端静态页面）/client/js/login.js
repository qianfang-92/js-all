$(function () {
    // 相当于 $.ready  当DOM结构加载完成后执行该函数
    $('.submit').on('click', function (e) {
        let account = $('input[type=text]').val();
        let password = $('input[type=password]').val();
        if (!account || !password) {
            alert('用户名或密码不能为空');
            return;
        }
        password = md5(password);  // 对密码进行md5加密
        // console.log(account,password);
        axios.post('/user/login',{
            account,password
        }).then((data)=>{
            console.log(data);
        },(err)=>{
            console.log(err);
        })
    })
})