$(function () {
    // 将当前操作的导航存到sessionStorage中
    sessionStorage.setItem('currentUrl','./page/userlist.html');
    
    let $tbody = $('.tableBox>tbody');
    let $deleteAll = $('.deleteAll'),
        $selectAll = $('.tableBox thead .w3'),
        $handle = $('.tableBox thead .w12'),
        $selectItems = null,
        $deleteBtns = null,
        $resetBtns = null;
    let canshow = true; // 能不能显示
    
    function role () {
        //  按照  resetpassword  这个权限进行判断
        let power = localStorage.getItem('power');
        if (power.indexOf('resetpassword') == -1) {
            canshow = false;
            $deleteAll.hide();
            $selectAll.hide();
            $handle.hide();
        }
    }
    role();

    function getData (options={}) {
        //options是传进来的搜索条件，
        options.t = Math.random();
        axios.get('/user/list',{params:options}).then((data)=>{
            console.log(data);
            render(data.data);
            $selectItems = $('.tableBox tbody input[type=checkbox]');
            eventBind();  //数据渲染完成之后再绑定事件
        }).catch(()=>{
            alert('系统繁忙');
        })
    }
    getData();
    function render (data=[]) {
        let str = '';
        data.forEach(item=>{
            let {name='',sex='',email='',phone='',department='',job='',desc='',id} = item;
            str += `<tr>
                        ${
                            canshow ? `<td class="w3"><input        type="checkbox"></td>` : ''
                        } 
                        <td class="w10">${name}</td>
                        <td class="w5">${sex== 0 ? '男' : '女'}</td>
                        <td class="w10">${department}</td>
                        <td class="w10">${job}</td>
                        <td class="w15">${email}</td>
                        <td class="w15">${phone}</td>
                        <td class="w20">${desc}</td>
                        ${
                            canshow ? `<td class="w12 btnBox">
                                    <a href="./useradd.html?id=${id}">编辑</a>
                                    <a href="javascript:;" data-id=${id}>删除</a>
                                    <a href="./reset.html?id=${id}" data-id=${id}>重置密码</a>

                                </td>` : ''
                        }
                        
                    </tr>`

        })
        $tbody.html(str);
    }

    // 实现全选功能
    $selectAll.children('input').on('change', function () {
        console.log(this.checked);// true false
        // $selectItems.attr('checked',this.checked);  行内属性
        $selectItems.get().forEach(item=>{
            item.checked = this.checked;
        })
    })

    function eventBind () {
        $deleteBtns = $('.tableBox tbody .btnBox a:nth-child(2)');
        $resetBtns = $('.tableBox tbody .btnBox a:nth-child(3)');
        // 给所有的删除按钮和重置按钮绑定点击事件
        $deleteBtns.on('click', function () {
            console.log(this)
            let ele = this;
            alert('确定删除吗？', {
                confirm : true,
                handled: function (type) {
                    console.log(type);
                    if (type == 'CONFIRM') {
                        // 1 怎么告诉后端对应的id ？
                        // 2 删除成功之后 前端怎么移除？
                        deleteFn($(ele).attr('data-id'));
                    }
                }
            })
        })
        $resetBtns.on('click', function () {
            alert('确定修改密码？', {
                
                   
                
            })
        })
    }
    function deleteFn (id) {
        axios.get('/user/delete',{params:{userId:id}}).then((data)=>{
            if (data.code == 0) {
                // 删除成功
            }
        })
    }

    // 获取下拉列表要展示的内容
    function initSelect () {
        axios.get('/department/list').then((data)=>{
            if (data.code == 0) {
                let str = `<option value="0">全部</option>`
                data.data.forEach(item=>{
                    str += `<option value="${item.id}">${item.name}</option>`
                })
                $('.selectBox').html(str);
            } else {
                alert('系统繁忙');
            }
        })
    }
    initSelect();
    // 选中下拉框指定内容时触发的函数
    $('.selectBox').on('change', function () {
        console.log(this.value);
        getData({departmentId:this.value});
    })

    //实现搜索框功能
    $('.searchInp').on('keydown', function (e) {
        if (e.keyCode == 13) {
            // 敲的回车键
            getData({
                departmentId:$('.selectBox')[0].value,
                search:this.value
            })
            this.value = ''; // 敲回车清空内容
        }
    })

    // 实现批量删除
    function batchDelete () {
        // 首先要获取到选择的元素
        let items = $('tbody tr').get().filter(item=>{
            // 返回true 就把当前项放到新数组中
            return $(item).find('input[type="checkBox"]')[0].checked
        }) 
        // items中存放的就是 选中的那几个 tr 
        let ary = [];
        items.forEach(item=>{
            let id = $(item).find('a:nth-child(2)').attr('data-id'); // 获取要删除的那项的id
            let p = axios.get('/user/delete?userId='+id);
            ary.push(p);
        })
        axios.all(ary).then((data)=>{
            console.log(data);
        })
    }
    $deleteAll.on('click',batchDelete);
})