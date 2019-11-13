$(function () {
    let $name = $('.baseBox>span');
    let $outBtn = $('.baseBox>a');
    let $menuBox = $('.menuBox');
    let $iframe = $('.iframeBox');
    let $as = null;

    $name.html('您好 '+localStorage.getItem('user_name'));

    $outBtn.on('click',function () {
        alert('确定退出吗？',{
            confirm:true,
            handled:function (type) {
                if (type == 'CONFIRM') {
                    axios.get('/user/signout').then(data=>{
                        if (data.code == 0) {
                            localStorage.removeItem('power');
                            location.href = './login.html';
                        }
                    },(err)=>{
                        alert('网络繁忙')
                    })
                }
            }
        })
    })

    axios.get('/user/login').then(data=>{
        if (data.code !== 0) {
            alert('登陆失效，请重新登陆',{
                handled(){
                    location.href = './login.html';
                }
            })
        }
    })

    function role () {
        // 后台给的power字符串  
        // userhandle|departhandle|jobhandle|departcustomer|allcustomer|resetpassword
        let power = localStorage.getItem('power') || '';
        let str = `
                        ${power.includes('userhandle') ? `<div class="itemBox">
                        <h3>
                            <i class="iconfont icon-yuangong"></i>
                            员工管理
                        </h3>
                        <nav class="item">
                        <a href="./page/userlist.html" target='iframeBox'>员工列表</a>
                        <a href="./page/useradd.html" target='iframeBox'>新增员工</a>
                        </nav>
                    </div>` : ''}
                    ${power.includes('departhandle') ? `<div class="itemBox">
                        <h3>
                            <i class="iconfont icon-guanliyuan"></i>
                            部门管理
                        </h3>
                        <nav class="item">
                        <a href="./page/departmentlist.html" target='iframeBox'>部门列表</a>
                        <a href="./page/departmentadd.html" target='iframeBox'>新增部门</a>
                        </nav>
                    </div>` : ''}
                    ${power.includes('jobhandle') ? `<div class="itemBox">
                        <h3>
                            <i class="iconfont icon-zhiwuguanli"></i>
                            职务管理
                        </h3>
                        <nav class="item">
                        <a href="./page/joblist.html" target='iframeBox'>职务列表</a>
                        <a href="./page/jobadd.html" target='iframeBox'>新增职务</a>
                        </nav>
                    </div>` : ''}
                    <div class="itemBox">
                        <h3>
                            <i class="iconfont icon-kehuguanli"></i>
                            客户管理
                        </h3>
                        <nav class="item">
                        <a href="./page/customerlist.html#my" target='iframeBox'>我的客户</a>
                            ${power.includes('allcustomer') ? `<a href="./page/customerlist.html#all" target='iframeBox'>全部客户</a>` : ''}
                            ${power.includes('departcustomer') ? `<a href="./page/customeradd.html" target='iframeBox'>新增客户</a>` : ''}
                        </nav>
                    </div>`
        $menuBox.html(str);
        $as = $menuBox.find('a');
    }
    role();

    function hash () {
        let $tar = $menuBox.find('.itemBox:last-child');
        if (this.location.hash == '#customer') {
            $tar.show().siblings('.itemBox').hide();
            let currenturl = sessionStorage.getItem('customerUrl');
            if (currenturl) {
                $iframe.attr('src',currenturl)
            } else {
                let url = $tar.find('a').eq(0).attr('href');
                $iframe.attr('src',url);
            }
        } else {
            $tar.hide().siblings('.itemBox').show();
            $as = $menuBox.find('a');
            let currenturl = sessionStorage.getItem('currentUrl');
            if (currenturl) {
                $iframe.attr('src',currenturl);
            } else {
                let url = $as.eq(0).attr('href');
                $iframe.attr('src',url);
            }
        }
    }
    hash();
    window.addEventListener('hashchange',hash)
    
})