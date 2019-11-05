$(function () {
    let $nameBox = $('.baseBox>span');
    let $outBtn = $('.baseBox>a');
    let $iframe = $('.iframeBox');
    let $menuBox = $('.menuBox');
    let $as = $menuBox.find('a');
    // 从本地获取用户名；
    $nameBox.html('您好：'+localStorage.getItem('user_name'));
    // 点击 安全退出 要做的事
    $outBtn.on('click', function () {
        alert('是否安全退出？', {
            confirm : true,
            handled: function (type) {
                console.log(type);
                // 当type是  confirm时  才会执行登出操作
                if (type === 'CONFIRM') {
                    axios.get('/user/signout').then((data)=>{
                        localStorage.removeItem('power'); //移除权限信息；
                        location.href = './login.html';
                    }, (err)=>{
                        // 网络问题
                        alert('系统繁忙，请稍后再试');
                    })
                }
            }
        })
    })

    // 检测是否登陆    每次进到首页都要验证
    axios.get('/user/login').then((data)=>{
        if (data.code !== 0) {
            // 这里 用两个等号，为了防止后端给了一个字符串0 如果用三个等号，会不匹配
            alert('当前登陆无效，请重新登陆', {
                handled: function () {
                    location.href = './login.html'
                }
            })
        }
    })

    //进来怎么执行 直接调到员工列表页
    // function initPage (n) {
    //     var ary = [
    //         './page/userlist.html',
    //         './page/useradd.html',
    //         './page//departmentlist.html',
    //         './page/departmentadd.html',
    //         './page/joblist.html',
    //         './page/jobadd.html',
    //         './page/customerlist.html',
    //         './page/customerlist.html',
    //         './page/customeradd.html'
    //     ]
    //     $iframe.attr('src', ary[n])
    // }
    // initPage(0);

    //  权限分配
    
    function role () {
        // 后台给的power字符串  
        // userhandle|departhandle|jobhandle|departcustomer|allcustomer|resetpassword

        // 从本地获取权限信息
        let power = localStorage.getItem('power') || '';

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
                                power.indexOf('allcustomer') !== -1 ? `<a href="./page/customerlist.html?t=2jh2k34hk2#all" target='iframeBox'>全部客户</a>` : ''
                            }
                            ${
                                power.indexOf('departcustomer')!== -1 ? `<a href="./page/customeradd.html" target='iframeBox'>新增客户</a>` : ''
                            }
                        </nav>
                    </div>`
        $menuBox.html(str);

    }
    role();
    // $as = $menuBox.find('a');  // 渲染完成之后再去更新变量
    // let url = $as.eq(0).attr('href')
    // $iframe.attr('src',url); // 跳转到第一个url；


    // 监听hash的改变 去判断显示客户管理还是组织结构
    function hash () {
        let $tar = $menuBox.find('.itemBox:last-child')
        if (this.location.hash == '#customer') {
            // 当前要展示的是客户管理
            $tar.show().siblings('.itemBox').hide();
            let currenturl = sessionStorage.getItem('customerUrl');
            if (currenturl) {
                $iframe.attr('src',currenturl)
            } else {
                let url = $tar.find('a').eq(0).attr('href');
                $iframe.attr('src',url)
            }
        } else {
            // 组织结构
            $tar.hide().siblings('.itemBox').show();
            $as = $menuBox.find('a');// 渲染完成之后再去更新变量
            let currenturl = sessionStorage.getItem('currentUrl');
            if (currenturl) {
                $iframe.attr('src',currenturl)
            } else {
                let url = $as.eq(0).attr('href')
                $iframe.attr('src',url);// 跳转到第一个url
            }
            
        }
    };
    hash();
    window.addEventListener('hashchange', hash)
    
   // 实现导航栏的折叠效果
    function foldFn () {
        let $h3s = $('.itemBox h3');
        $h3s.on('click', function () {
            $(this).siblings('.item').slideToggle('fast')
        })
    }
    foldFn();

  /*   $menuBox.click(function (ev) {
        let target = ev.target,
            tarTag = target.tagName,
            $target = $(target);
        tarTag === 'I' ? ($target = $target.parent(), $tarTag = 'H3') : null;
        if (tarTag === 'H3') {
            $target.next().stop().slideToggle(300);
        }
    }); */
})