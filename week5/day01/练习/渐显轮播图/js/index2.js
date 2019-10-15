$.fn.extend({
    banner : function () {
        let $box = this,
            $ul = $box.find('ul'),
            $lis = $ul.children('li'),
            $tipBox = $box.find('.tip_box'),
            $tips = $tipBox.children('.tip'),
            $leftBtn = $box.find('.left_btn'),
            $rightBtn = $box.find('.right_btn');

        let n = 0,
            timer = null;

        function getData () {
            $.ajax({
                type:'get',
                url:'./data.json',
                success : function (data) {
                    render(data);
                    init();
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
                let {img, desc} = item;
                str += `<li>
                            <img src="${img}" alt="">
                            <p class="desc">${desc}</p>
                        </li>`
                tipStr += (index == 0 ? `<span class="tip current"></span>` : `\n<span class="tip"></span>`)
            })
            $ul.html(str);
            $tipBox.html(tipStr);
        }
        function init () {
            $lis = $ul.children('li');
            $tips = $tipBox.children('.tip')
            $lis.eq(0).siblings().hide();
        }

        function move () {
            n++;
            if (n >= $tips.length) {
                n = 0;
            }
            $lis.eq(n).show().css({opacity:0}).animate({opacity:1}).siblings().animate({opacity:0},300, function () {
                $lis.eq(n).siblings().hide();
            })
            autoFocus(n);
        }

        function autoMove () {
            timer = setInterval(()=>{
                move();
            },1000)
        }

        function autoFocus (m) {
            $tips.eq(m).addClass('current').siblings().removeClass('current');
        }

        function onEvent () {
            $box.on('mouseenter', function () {
                clearInterval(timer);
            })
            $box.on('mouseleave', function () {
                autoMove()
            })
            $leftBtn.on('click', function () {
                n--;
                if (n < 0) {
                    n = $lis.length - 1;
                }
                n--;
                move();
            })
            $rightBtn.on('click', function () {
                move();
            })
            $tips.on('click', function () {
                let i = $(this).index();
                n = i;
                n--;
                move();
            })
        }
    }
})


$('#box').banner();