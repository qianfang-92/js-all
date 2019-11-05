$(function(){
     // 将当前操作的导航存到sessionStorage中
     sessionStorage.setItem('currentUrl','./page/userlist.html');
     
    let $username = $('.username'),
        $man = $('#man'),
        $woman = $('#woman'),
        $useremail = $('.useremail'),
        $userphone = $('.userphone'),
        $userdepartment = $('.userdepartment'),
        $userjob = $('.userjob'),
        $userdesc = $('.userdesc'),
        $submit = $('.submit');
    let id = location.href.queryURLParams().id;
    /* let depId = null,
        jId = null; */
    // 这个id是当前编辑的用户的id
    if(id != undefined){
        // 是编辑状态
        axios.get('/user/info?userId='+id).then(data=>{
            if(data.code == 0){
                let {name,sex,email,phone,departmentId,jobId,desc} = data.data;
                $username.val(name);
                sex == 0 ? $man.attr('checked',true) : $woman.attr('checked',true);
                $useremail.val(email);
                $userphone.val(phone);
                $userdesc.val(desc);
                // depId = departmentId;
                // jId = jobId;
                initAdd('/department/list',$userdepartment,departmentId);
                initAdd('/job/list',$userjob,jobId);
            }else{
                alert('系统繁忙')
            }
        })
    } else {
        // 新增
        initAdd('/department/list',$userdepartment,1);
        initAdd('/job/list',$userjob,1);
    }

    function initAdd (url,tar,id) {
        // 初始化部门列表
        axios.get(url).then((data)=>{
            if (data.code == 0) {
                let ary = data.data || [];
                let str = '';
                ary.forEach(item=>{
                    str += `<option value="${item.id}">${item.name}</option>`
                })
                tar.html(str);
               tar.val(id); // 是让对应的部门选中
            }
        })
    }

    // initAdd('/department/list',$userdepartment,depId);
    // initAdd('/job/list',$userjob,jId);

    /* function initDepart () {
        // 初始化部门列表
        axios.get('/department/list').then((data)=>{
            if (data.code == 0) {
                let ary = data.data || [];
                let str = '';
                ary.forEach(item=>{
                    str += `<option value="${item.id}">${item.name}</option>`
                })
                $userdepartment.html(str);
                $userdepartment.val(depId); // 是让对应的部门选中
            }
        })
    } */

   /*  function initJob () {
        // 初始化职务列表
    } */

    // 实现提交
    $submit.on('click',function (e) {
        // let usersex = $man.attr('checked') ? 0 : 1;
        // 男的被选中就是男的 不被选中就是女的
        // 执行post之前判断必填输入框是否为空
        // 姓名 性别 邮箱 电话 部门  职务
        let name = $username.val(),
            sex = $man[0].checked ? 0  : 1,
            email = $useremail.val(),
            phone = $userphone.val(),
            departmentId = $userdepartment.val(),
            jobId = $userjob.val(),
            desc=$userdesc.val();

        if (name&&email&&phone&&departmentId&&jobId) {
            let obj = {};
            id ? obj.userId = id : null;
            let option = {
                name,
                sex,
                email,
                phone,
                departmentId,
                jobId,
                desc
            }
            // 新增接口是add；更新接口是 update
            let url = id ? '/user/update' : '/user/add';
            axios.post(url,Object.assign(option,obj));
            // lodash 里  let o = assign(a,b);把对象合并到a中，返回值是合并之后的a ， o === a;

        } else {
            alert('必填项不能为空');
        }

        
    })
})
