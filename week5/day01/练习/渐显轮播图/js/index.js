
// 获取数据
let $box = $('#box'),
    $ul = $box.find('.img_box ul'),
    $lis = $ul.children('li'),
    $tipBox = $box.find('.tip_box'),
    $tips = $tipBox.children('.tip'),
    $leftBtn = $box.find('.btn_box .left_btn'),
    $rightBtn = $box.find('.btn_box .right_btn');
let n = 0,
    timer = null;

function getData () {
    $.ajax({
        type:'get',
        url:'./data.json',
        success: function (data) {
            render(data);
            autoMove();
            onEvent();
        }
    })
}
getData();

function render (ary) {
    let str = '',
        tipStr = '';
    ary.forEach((item, index)=>{
        str += `<li>
                    <img src="${item.img}" alt="">
                    <p class="desc">${item.desc}</p>
                </li>`;
        tipStr += (index == 0 ? `<span class="tip current"></span>` : `\n<span class="tip"></span>`)
    })
    $ul.html(str);
    $tipBox.html(tipStr);
    $lis = $ul.children('li');
    $tips = $tipBox.children('.tip');
    $lis.eq(0).siblings().hide();
}

function move () {
    n++;
    if (n >= $tips.length) {
        n = 0;
    }
    $lis.eq(n).show().css({opacity:0}).animate({opacity:1},300).siblings().animate({opacity:0},300, function () {
        $lis.eq(n).siblings().hide()
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

function onEvent () {
    $box.on('mouseenter', function () {
        clearInterval(timer);
    })
    $box.on('mouseleave', function () {
        autoMove();
    })
    $leftBtn.on('click', throttle(function () {
        n--;
        if (n < 0) {
            n = $lis.length - 1;
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

function throttle (f, wait=500) {
    let flag = true;
    return function () {
        if (!flag) return;
        flag = false;
        setTimeout(()=>{
            flag = true;
            f.apply(this, arguments)
        }, wait)
    }
}