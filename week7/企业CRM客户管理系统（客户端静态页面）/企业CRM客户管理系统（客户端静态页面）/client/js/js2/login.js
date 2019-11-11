$(function () {
    $('.submit').on('click', function (e) {
        let account = $('input[type=text]').val();
        let password = $('input[type=password]').val();
        if (!account || !password) {
            alert('用户名和密码不能为空');
            return;
        }
        password = md5(password); // 对密码进行加密
        axios.post('/user/login',{account,password}).then(data=>{
            if (data.code == 0) {
                alert('登陆成功',{
                    handled: function () {
                        location.href = './index.html';
                    }
                })
                localStorage.setItem('user_name',account);
                localStorage.setItem('power',data.power);
            } else {
                alert('账号密码错误');
            }
        },()=>{
            alert('网络繁忙');
        })
    })
})