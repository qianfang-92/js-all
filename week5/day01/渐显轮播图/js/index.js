var banner = (function () {  //高级单例 简单的模块化
    let idSelector = '';
    let $box = null,
        $ul = null,
        $lis = null,
        $tipBox = null,
        $tips = null,
        $leftBtn = null,
        $rightBtn = null,
        n = null,
        timer = null;
    function initEle () {
        $box = $(idSelector);
        $ul = $box.find('.img_box ul');
        $lis = $box.find('.img_box ul li');
        $tipBox = $box.find('.tip_box');
        $tips = $tipBox.children('.tip');
        $leftBtn = $box.find('.left_btn');
        $rightBtn = $box.find('.right_btn');
        n = 0;
        timer = null;
        $lis.eq(0).siblings().hide();
    }
    function getData () {
        $.ajax({
            url:'./data.json',
            success:function (data) {
                // data 是后台给的数组，已经被JSON处理过的，不用再处理
                render(data);
                initEle(idSelector);
                autoMove();
                click();
            },
            error:function () {
                alert('失败')
            }
        })
    }
    function render (ary) {
        let str = '',
            tipStr = '';
        ary.forEach((item, index)=>{
            let {img, desc} = item;
            str += `<li>
                        <img src="${img}" alt="">
                        <p>${desc}</p>
                    </li>`
                    tipStr += (index == 0 ?  `<span class="tip current"></span>` : `\n<span class="tip"></span>`)
        })
        $ul.html(str);
        $tipBox.html(tipStr);
    }
    function move () {
        n++;
        if (n >= $tips.length) {
            n = 0;
        }
        $lis.eq(n).show().css({opacity:0}).animate({opacity:1},300).siblings().animate({opacity:0},300,function () {
            $lis.eq(n).siblings().hide();
        })
        autoFocus(n);
    }
    function autoMove () {
        timer = setInterval(()=>{
            move();
        },2000)
    }
    function autoFocus (m) {
        $tips.eq(m).addClass('current').siblings().removeClass('current');
    }
    function click () {
        $box.on('mouseenter', function () {
            clearInterval(timer);
        })
        $box.on('mouseleave', function () {
            autoMove();
        })
        $leftBtn.on('click', throttle(function () {
            n--;
            if (n < 0) {
                n = $tips.length -1;
            }
            n--;
            move();
        },1000))
        $rightBtn.on('click', throttle(function () {
            move();
        },1000))
        $tips.on('click', function () {
            let i = $(this).index();
            n = i;
            n--;
            move();
        })
    }
    function throttle (f, wait = 500) {
        let flag = true;
        return function () {
            if (!flag) return;
            flag = false;
            setTimeout(()=>{
                flag = true;
                f.call(this, ...arguments)
            },wait)
        }
    }
    return {
        init(id){
            idSelector = id;
           initEle();
           getData(); // 异步的
        }
    }
})();

banner.init('#box');




// forEach 封装函数  传的参数是一个回调函数
[].__proto__.myForEach = function (cb) {
    // this 就是操作的数组
    let n = this.length;
    for (var i = 0; i < n; i++) {
        cb(this[i], i, this);
    }
}

$.extend({

})
$.fn.extend({
    initBanner:banner.init
    // 这时，需要把banner的init里的idSelector 换成 ieSelector = '#' + this.attr('id')  这里的this 是$('#box') 
})

// $('#box').initBanner();