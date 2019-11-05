$(function () {
    // 将当前操作的导航存到sessionStorage中
    sessionStorage.setItem('currentUrl','./page/departmentlist.html');

    let $inp = $('input'),
        $textA = $('textarea'),
        $submit = $('.submit');
    let id = location.href.queryURLParams().departmentId;
    
    if (id) {
        // id存在  就是编辑状态
        axios.get('/department/info?departmentId='+id).then((data)=>{
            if (data.code == 0) {
                $inp.val(data.data.name);
                $textA.val(data.data.desc);
            }
        })
    } else {
        // 新增状态
    }
    $submit.on('click', function () {
        let url = id　? '/department/update' : 'department/add';
        let obj = {};
        id ? obj.departmentId = id : null;
        let name = $inp.val();
        let desc = $textA.val();
        if (!name) {
            alert('部门名称不能为空');
             return;
        }
        let options = {
            name,desc
        }
        axios.post(url,Object.assign(options,obj));
    })
})