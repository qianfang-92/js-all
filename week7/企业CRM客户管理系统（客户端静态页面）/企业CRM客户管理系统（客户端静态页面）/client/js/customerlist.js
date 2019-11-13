$(function () {
    let page = 1,limit = 5;
    console.log(location.hash);
    function fn() {
        console.log(location.hash);
        // 将当前操作的导航存到sessionStorage中
        getData({
            limit,
            page
        });
        sessionStorage.setItem('customerUrl','./page/customerlist.html'+location.hash)
    }
    fn();
    window.addEventListener('hashchange',fn)

    function getData (options={}) {
        // options 存储的是发送后台的数据
        options.lx = location.hash.slice(1);
        axios.get('/customer/list',{params:options}).then((data)=>{
            render(data.data);
            eventBind();
            initPage(data.limit,data.total,data.page)
        })
    }
    function render (ary) {
        let str = '';
        ary.forEach(item=>{
            let {id,name,sex,email,phone,QQ,weixin,type,address,userId,userName = ''} = item;
            str += `<tr>
                        <td class="w8">${name}</td>
                        <td class="w5">${sex ? '男' :'女'}</td>
                        <td class="w10">${email}</td>
                        <td class="w10">${phone}</td>
                        <td class="w10">${weixin}</td>
                        <td class="w10">${QQ}</td>
                        <td class="w5">${type}</td>
                        <td class="w8">${userName}</td>
                        <td class="w20">${address}</td>
                        <td class="w14">
                            <a href="./customeradd.html?id=${id}">编辑</a>
                            <a href="javascript:;" class="delBtn" id=${id}>删除</a>
                            <a href="./visit.html">回访记录</a>
                        </td>
                    </tr>`
        })
        $('tbody').html(str);
    }
    getData({
        limit,
        page
    });

    function initPage (limit,total,current) {
        let n = Math.ceil(total/limit); // 有多少页
        let str = '';
        for (let i = 0; i < n ; i++) {
            str += `<li class="${i + 1 == current ? 'active': ''}">${i + 1}</li>`
        }
        $('.pageNum').html(str);

        $('.pageBox').off() ; // 移除所有绑定过的事件，因为Jq 绑定的都是二级事件，会累计；这样提升性能
        $('.pageBox').on('click', function (e) {
            let tar = e.target;
            let type = e.target.tagName.toLowerCase();
            if (type == 'li') {
                //点击的是页码
                page = tar.innerHTML;
                getData({
                    limit,
                    page
                })
            } else if (type == 'a') {
                // 点击的是上下页
                if ($(tar).index() == 0) {
                    // 说明点击的是上一页
                    page = page == 1 ? 1 : page - 1;
                } else {
                    page = page == n ? n : page + 1;
                }
                getData({
                    limit,page
                })
            }
        })
    }


    function eventBind () {
        $('.delBtn').on('click', function () {
            let id = $(this).attr('id')
            alert('确定删除吗？',{
                confirm:true,
                title:'警告',
                handled (type) {
                    if (type == 'CONFIRM') {
                        delFn(id)
                    }
                }
            })
        })

        
    }
    function delFn (id) {
        axios.get('/customer/delete?customerId='+id);
    }
    
})