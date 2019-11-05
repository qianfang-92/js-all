$(function () {
    // 将当前操作的导航存到sessionStorage中
    sessionStorage.setItem('currentUrl','./page/joblist.html'); 

    let power = localStorage.getItem('power');
    let canshow = power.includes('resetpassword');

    if (!canshow) {
        // $('.btnBox').hide();
        $('.btnBox').remove();
    }

    function getData () {
        axios.get('/job/list').then((data)=>{
            if (data.code == 0) {
                render(data.data);
                eventBind();
            } else {
                alert('网络繁忙')
            }
        })
    }
    getData();
    function render (ary) {
        let str = '';
        ary.forEach(item=>{
            let {id,name,desc,power} = item;
            str += `<tr>
                        <td class="w8">${id}</td>
                        <td class="w10">${name}</td>
                        <td class="w20">${desc}</td>
                        <td class="w50">${trans(power)}</td>
                        <td class="w12">
                        ${
                            canshow ? `<a href="./jobadd.html?jobId=${id}" class="btn" >编辑</a>
                            <a href="javascript:;" class="delBtn" jobId=${id}>删除</a>` : ''
                        }
                        </td>
                    </tr>`
        })
        $('tbody').html(str);
    }
    let obj = {
        // userhandle|departhandle|jobhandle|departcustomer|allcustomer|resetpassword
        userhandle:'员工操作权',
        departhandle:'部门操作权',
        jobhandle:'职务操作权',
        departcustomer:'部门全部客户',
        allcustomer:'公司全部客户',
        resetpassword:'重置密码'
     }
    function trans (power='') {
        let ary = power.split('|');
        return ary.map(item=>{
            return obj[item];
        }).join('|')
    }

    function delFn (id) {
        axios.get('/job/delete?jobId='+id)
    }
    
    function eventBind () {
        $('.delBtn').on('click',function () {
            let id = $(this).attr('jobId');
            alert('确定删除吗？',{
                title:'警告',
                confirm:true,
                handled (type) {
                    if (type == 'CONFIRM') {
                        delFn(id)
                    }
                }
            })
        })
    }
})