$(function () {
    // 将当前操作的导航存到sessionStorage中
    sessionStorage.setItem('currentUrl','./page/departmentlist.html');

    // 获取数据 展示列表
    // 进行权限判断，展示不展示操作权
    // 点击对应编辑 带着id跳转到添加页   点击删除 弹出 警示框 然后再做是否删除的操作
    let power = localStorage.getItem('power');
    // setItem 的 第二个参数 必须是字符串 如果是引用数据类型会调用自己的toString方法 变成字符串，所以如果设置的是对象时，需要自己用JSON.stringify把对象转成字符串

    // let canshow = power.indexOf('resetpassword') == -1 ? false : true;
    let canshow = power.includes('resetpassword');
    function getData () {
        axios.get('/department/list').then((data)=>{
            if (data.code == 0) {
                render(data.data);
                eventBind();
            } else {
                alert('系统繁忙')
            }
        })
    }
    getData();
    function render (ary) {
        let str = '';
        ary.forEach(item=>{
            let {id,name,desc} = item;
            // 对象解构赋值按属性名 数组的解构赋值按位置
            str += `<tr>
                        <td class="w10">${id}</td>
                        <td class="w20">${name}</td>
                        <td class="w40">${desc}</td>
                        <td class="w20">
                        ${canshow ? `<a class="btnBox" href="./departmentadd.html?departmentId=${id}" >编辑</a>
                        <a href="javascript:;" class="delBtn" departmentId=${id}>删除</a>` : ''}
                        </td>
                    </tr>`
        })
        $('.tableBox tbody').html(str);
    }
    if (!canshow) {
        $('.btnBox').hide();
    }
    function del(id) {
        axios.get('/department/delete?departmentId='+id)
    }
    function eventBind () {
        // 实现事件的绑定；
        $('.delBtn').on('click', function () {
            let id = $(this).attr('departmentId');
            alert('确定删除？', {
                title:'警告',
                confirm:true,
                handled:function (type) {
                    if (type == 'CONFIRM') {
                        // 确定删除
                        del(id)
                    }
                }
            });
        })
    }

})