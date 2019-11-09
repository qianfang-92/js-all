$(function () {
    sessionStorage.setItem('customerUrl','./page/customerlist.html#my');

    let $inp = $('.username'),
        $sex= $('input[type=radio]'),
        $email = $('.useremail'),
        $phone = $('.userphone'),
        $QQ = $('.userqq'),
        $weixin = $('.userweixin'),
        $type = $('select'),
        $address = $('textarea'),
        $submit = $('.submit');
    
    let id = location.href.queryURLParams().id;

    if (id) {
        // 编辑状态
        axios.get('/customer/info?customerId='+id).then((data)=>{
            let {id,name,sex,email,phone,QQ,weixin,type,address,userId} = data.data;
            $inp.val(name);
            $sex.val(sex ? '男' : '女');
            $email.val(email);
            $QQ.val(QQ);
            $phone.val(phone);
            $weixin.val(weixin);
            $type.val(type);
            $address.val(address);
        })
    }
    $submit.on('click', function () {
        let url = id ? '/customer/update' : '/customer/add';
        let obj = {};
        id ? obj.customerId = id : null;
        let name = $inp.val(),
            sex = $sex.val(),
            email = $email.val(),
            phone = $phone.val(),
            QQ = $QQ.val(),
            weixin = $weixin.val(),
            type = $type.val(),
            address = $address.val();
        let options = {
            name,sex,email,phone,QQ,weixin,type,address
        }
        if (!name || !phone || !email || !address) {
            alert('必填项不能为空');
            return;
        }
        axios.post(url,Object.assign(options,obj))
    })

})