//获取数据

let $ul = $('#box .img_box ul');
let $tipBox = $('#box .tip_box');
let $lis = $('#box .img_box ul li');
let $tips = $('#box .tip_box .tip');
let $box = $('#box');
let $leftBtn = $('#box .left_btn');
let $rightBtn = $('#box .right_btn');
let n = 0;
let timer = null;
function getData () {
    $.ajax({
        type:'get',
        url:'./data.json',
        success:function (data) {
            render(data);
            init();
            autoMove();
        }
    })
}
getData()
function render (ary) {
    let str = '';
    let str2 = '';
    ary.reverse().forEach((item,index)=>{
        let {img, desc} = item;
        str += `<li>
                    <img src="${img}" alt="">
                    <p class="desc">${desc}</p>
                </li>`
        if(index == 0) {
            str2 += `<span class="tip current"></span>\n`
        } else {
            str2 += `<span class="tip"></span>\n`
        }
    })
    $ul.html(str);
    $tipBox.html(str2);

}

function init () {
    $lis = $('#box .img_box ul li');
    $lis.eq(0).siblings().hide();
    $tips = $('#box .tip_box .tip');
}

function autoMove() {
    timer = setInterval(()=>{
        move();
    },2000)
}

function move () {
    n++;
    if (n >= $lis.length) {
        n = 0;
    }
    autoFocus();
    // $lis.eq(n).show().siblings().hide();
    $lis.eq(n).css({opacity:0, display:'none'}).show().animate({opacity:1},300).siblings().animate({opacity:0},300,function () {$lis.eq(n).siblings().hide()})

}

function autoFocus () {
    $tips.eq(n).addClass('current').siblings().removeClass('current');
}

$box.on('mouseenter', function () {
    clearInterval(timer);
})
$box.on('mouseleave', function () {
    autoMove();
})

// 下划线是 underscore的标识符，相当于$
$rightBtn.on('click', _.throttle(function () {
    move();
},1000))


$leftBtn.on('click', _.throttle(function () {
    n--;
    if (n < 0) {
        n = $lis.length - 1;
    }
    n--;
    move();
},1000))
