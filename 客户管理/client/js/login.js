$(function () {
    $('.submit').on('click',function () {
        let account = $('input[type=text]').val();
        let password = $('input[type=password]').val();
        if (!account || !password) {
            alert('账户名和密码不能为空');
            return 
        }
        password = md5(password);
        axios.post('/user/login',{account,password}).then(data=>{
            if (data.code == 0) {
                alert('登陆成功',{
                    handled : function () {
                        location.href = './index.html';
                    }
                })
                localStorage.setItem('power',data.power);
                localStorage.setItem('user_name',account);
            } else {
                alert('账号密码错误')
            }
        },(err)=>{
            alert('网络繁忙')
        })
    })
})