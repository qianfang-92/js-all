$(function () {
    sessionStorage.setItem('currentUrl','./page/userlist.html');

    let $tbody = $('tbody'),
        $deleteAll = $('.deleteAll'),
        $selectBox = $('.selectBox'),
        $seleteAll = $('.tableBox>thead>tr>.w3'),
        $handle = $('.tableBox>thead>tr>.w12'),
        $selectItems = null,
        $deleteBtns = null,
        $resetBtns = null;

    let power = localStorage.getItem('power');
    let canshow = power.includes('resetpassword');
    function role () {
        if (!canshow) {
            $deleteAll.hide();
            $seleteAll.hide();
            $handle.hide();
        }
    }
    role();

    function getData (options={}) {

        axios.get('/user/list',{params:options}).then(data=>{
            if (data.code == 0) {
                render(data.data);
                $selectItems = $('tbody input[type=checkbox]');
            }
        }).catch(err=>{
            alert('系统繁忙');
        })
    }
    getData();
    function render (ary) {
        let str = '';
        ary.forEach(item=>{
            let {id,name='',sex='',email='',phone='',department='',job='',desc=''} = item;
            str += `<tr>
                        ${canshow ? `<td class="w3"><input type="checkbox"></td>` : ''}
                        <td class="w10">${name}</td>
                        <td class="w5">${sex ? '男':'女'}</td>
                        <td class="w10">${department}</td>
                        <td class="w10">${job}</td>
                        <td class="w15">${email}</td>
                        <td class="w15">${phone}</td>
                        <td class="w20">${desc}</td>
                        ${canshow ? `<td class="w12 btnBox">
                            <a href="./useradd.html?id=${id}">编辑</a>
                            <a href="javascript:;" data-id=${id}>删除</a>
                            <a href="./reset.html?id=${id}" data-id=${id}>重置密码</a>
                        </td>` : ''}
                        
                    </tr>`
        })
        $tbody.html(str);
    }

    $seleteAll.children('input').on('change', function () {
        $selectItems.get().forEach(item=>{
            item.checked = this.checked;
        })
    })

    function eventBind () {
        $deleteBtns = $('tbody .btnBox a:nth-child(2)');
        $resetBtns = $('tbody .btnBox a:nth-child(3)');

        $deleteBtns.on('click', function () {
            let ele = this;
            alert('确定删除吗？',{
                confirm:true,
                handled:(type)=>{
                    if (type == 'CONFIRM') {
                        axios.get('/user/delete', {params:{userId:$(ele).attr(data-id)}})
                    }
                }
            })
        })
    }
})