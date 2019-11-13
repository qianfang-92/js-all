$(function () {
    let $nameBox = $('.baseBox>span');
    let $outBtn = $('.baseBox>a');
    let $menuBox = $('.menuBox');
    let $iframeBox = $('.iframeBox');
    // 从本地获取用户名
    $nameBox.html('您好 '+localStorage.getItem('user_name'));

    // 点击安全退出
    $outBtn.on('click',()=>{
        alert('确定退出吗？',{
            confirm:true,
            handled:(type)=>{
                if (type == 'CONFIRM') {
                    axios.get('/user/signout').then(data=>{
                        if (data.code == 0) {
                            localStorage.removeItem('power');
                            location.href = './login.html';
                        } 
                    }).catch(err=>{
                        alert('系统繁忙')
                    })
                }
            }
        })
    })

    // 进入首页时检测是否登陆
    axios.get('/user/login').then(data=>{
        if (data.code != 0) {
            alert('当前登陆无效，请重新登陆',{
                handled(){
                    location.href = './login.html';
                }
            })
        }
    })

    // 权限分配
    function role () {
        let power = localStorage.getItem('power');
        var str = `
                    ${
                        power.indexOf('userhandle') !== -1 ? `<div class="itemBox">
                            <h3>
                                <i class="iconfont icon-yuangong"></i>
                                员工管理
                            </h3>
                            <nav class="item">
                                <a href="./page/userlist.html" target='iframeBox'>员工列表</a>
                                <a href="./page/useradd.html" target='iframeBox'>新增员工</a>
                                
                            </nav>
                        </div>` : ''
                    }
                    ${
                        power.indexOf('departhandle') !== -1 ? `<div class="itemBox">
                            <h3>
                                <i class="iconfont icon-guanliyuan"></i>
                                部门管理
                            </h3>
                            <nav class="item">
                                <a href="./page/departmentlist.html" target='iframeBox'>部门列表</a>
                                <a href="./page/departmentadd.html" target='iframeBox'>新增部门</a>
                            </nav>
                        </div>` : ''
                    }
                    ${
                        power.indexOf('jobhandle') !== -1 ? 
                        `<div class="itemBox">
                            <h3>
                                <i class="iconfont icon-zhiwuguanli"></i>
                                职务管理
                            </h3>
                            <nav class="item">
                                <a href="./page/joblist.html" target='iframeBox'>职务列表</a>
                                <a href="./page/jobadd.html" target='iframeBox'>新增职务</a>
                            </nav>
                        </div>` : ''
                    }
                    <div class="itemBox" style="display:none">
                        <h3>
                            <i class="iconfont icon-kehuguanli"></i>
                            客户管理
                        </h3>
                        <nav class="item">
                            <a href="./page/customerlist.html#my" target='iframeBox'>我的客户</a>
                            ${
                                power.indexOf('allcustomer') !== -1 ? `<a href="./page/customerlist.html?t=${Math.random()}#all" target='iframeBox'>全部客户</a>` : ''
                            }
                            ${
                                power.indexOf('departcustomer')!== -1 ? `<a href="./page/customeradd.html" target='iframeBox'>新增客户</a>` : ''
                            }
                        </nav>
                    </div>`
        $menuBox.html(str);
    }
    role();

    // 监听hash的值来判断该显示的页面是客户管理还是组织结构
    function hash () {
        let $tar = $menuBox.find('.itemBox:last-child');
        if (this.location.hash == '#customer') {
            $tar.show().siblings('.itemBox').hide();
            let currenturl = sessionStorage.getItem('customerUrl');
            if (currenturl) {
                $iframeBox.attr('src',currenturl);
            } else {
                let url = $tar.find('a').eq(0).attr('href');
                $iframeBox.attr('src',url);//跳转到第一个url
            }
        } else {
            $tar.hide().siblings('.itemBox').show();
            let $as = $menuBox.find('a');
            let currenturl = sessionStorage.getItem('currentUrl');
            if (currenturl) {
                $iframeBox.attr('src',currenturl);
            } else {
                let url = $as.eq(0).attr('href');
                $iframeBox.attr('src',url);
            }
        }
    }
    hash();
    window.addEventListener('hashchange',hash);

    // 实现导航栏的折叠效果
    function foldFn () {
        let $h3s = $menuBox.find('h3');
        $h3s.on('click',function(){
            $(this).siblings('.item').slideToggle('fast');
        })
    }
    foldFn();
})