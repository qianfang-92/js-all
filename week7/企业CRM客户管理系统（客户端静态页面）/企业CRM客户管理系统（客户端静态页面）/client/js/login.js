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
            // 登陆成功
            // 跳转到首页
            // 存储权限信息
            console.log(data);
            if (data.code == 0) {
                //密码正确
                alert('登陆成功', {
                    // 点击关闭按钮时执行；
                    handled: function () {
                        location.href = './index.html'
                    }
                })
                // 把权限信息存在localStorage 本地
                localStorage.setItem('power', data.power);
                //把用户名存储在本地
                localStorage.setItem('user_name',account);
            } else {
                // 密码错误
                alert('账号密码错误');
            }
        },(err)=>{
            // 登陆失败
            alert('网络错误，请稍后重试');
            console.log(err);
        })
    })
})