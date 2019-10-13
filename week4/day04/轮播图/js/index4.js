$.fn.extend({   // 把对应的方法放在了JQ的原型上
    myFn:function () {
        console.log(9);
        console.log(this); //这里的this看谁执行这个函数，执行它的是JQ对象时，this就是JQ对象
    },
    banner: function(){
        let $box = this,
            $ul = $box.find('ul') //find可以找到所有后代
            // console.log($ul)
        let $tipBox = $box.find('.tip_box'),
            $tips = $tipBox.children('.tip'),
            $leftBtn = $box.find('.left_btn'),
            $rightBtn = $box.find('.right_btn');
        let n = 0;
            timer = null;
            function getData () {
                $.ajax({
                    type:'get',
                    url:'./data.json',
                    success:function (data) {
                        // 请求成功后执行的回调函数
                        console.log(data);
                        render(data);
                        tipClick(); //数据加载完成之后再去绑定事件
                    },
                    error:function () {
                        // 请求失败会执行该函数
                        console.log('失败')
                    }
                })
            }
            
            getData();
            
            function render (data) {
                let str = '';
                let tipStr = '';
                data.push(data[0]); //补图
                data.forEach((item, index)=>{
                    let {img, desc} = item;
                    str += `<li>
                                <img src="${img}" alt="">
                                <p class="desc">${desc}</p>
                            </li>`
            
                    if (index == 0) {
                        tipStr += '<span class="tip current"></span>'
                    } else if (index < data.length - 1){
                        tipStr += '<span class="tip"></span>'
                    }
                })
                $ul.width(590*data.length);
                $ul.html(str);
                $tipBox.html(tipStr);
                $tips = $tipBox.find('.tip'); // 更新tips 因为$tips不存在映射
            }
            
            function move () {
                n++;
                if (n > $tips.length) {
                    $ul.css({left:0}) // $ul.css('left', 0);
                    n = 1;
                }
                $ul.animate({left:-590*n},500);
                autoFocus(n);
            }
            function autoMove () {
                timer = setInterval(()=>{
                    move();
                },2000)
            }
            autoMove();
            
            function autoFocus (m) {
                if (m >= $tips.length) {
                    m = 0;
                } 
                // m 就是要有点的那个索引；
                $tips.eq(m).addClass('current').siblings().removeClass('current'); // siblings是它的兄弟元素，里面也可以传参数，标签选择器
            }
            
            $box.on('mouseenter', function () {
                clearInterval(timer);
            })
            $box.on('mouseleave', function () {
                autoMove();
            })
            
            $leftBtn.on('click', function () {
                n--;
                if (n < 0) {
                    $ul.css({left:-590*$tips.length}) // 闪到最后一张
                    n = $tips.length - 1;
                }
                $ul.animate({left:-590*n},500);
                autoFocus(n);
            })
            $rightBtn.on('click', function () {
                move();
            })
            
            function tipClick () {
                $tips.on('click', function () {
                    let m = $(this).index();  // 这时点谁就会是谁的index索引   这里的this是原生对象
                    $ul.animate({left:-590*m},200)
                    autoFocus(m);
                    n = m;
                })
            }  
         
    }
})

$('#box').banner();