let bell = document.getElementById('bell')
let say = document.getElementById('say');
let bgm = document.getElementById('bgm');
function loadBox () {
    let progress = document.querySelector('.progress'); //获取进度条
    let loadingBox = document.querySelector('.loadingBox');
    let ary = ['phone-bg.jpg',
    'phone-listen.png', 'phone-key.png', 'phone-logo.png', 'phone-name.png', 'message-head1.png', 'message-head2.png', 'message-keyboard.png', 'cube-bg.jpg', 'cube-img1.png', 'cube-img2.png', 'cube-img3.png', 'cube-img4.png', 'cube-img5.png', 'cube-img6.png', 'cube-tip.png', 'menu-icon.png', 'concat-address.png', 'concat-icon1.png', 'concat-icon2.png', 'course-icon1.png', 'course-icon2.png', 'course-icon3.png', 'course-icon4.png', 'course-icon5.png', 'course-icon6.png', 'course-icon7.png', 'course-pocket.png', 'school-bot1.png', 'school-bot2.png', 'school-img1.jpg', 'school-img2.jpg', 'school-img3.jpg', 'teacher-title.png', 'zf-detailsReturn.png', 'zf-jobTable.png', 'zf-teacher1.png', 'zf-teacher2.png', 'zf-teacher3.jpg', 'zf-teacher4.png', 'zf-teacher5.png', 'zf-teacher6.png'];
    let n = 0;//记录已经加载过来的图片张数
    ary.forEach(item=>{
        let img = new Image();
        img.src = `./images/${item}`;
        img.onload = function () {
            n++;
            let per = n/ary.length;
            progress.style.width = per*100 + '%';
            if (n == ary.length) {
                progress.addEventListener('transitionend',function (e) {
                    btn.classList.remove('hide');
                })
                // 所有图片已经加载完成
            }
        }
    })
    btn.ontouchstart = function (e) {
        this.sx = e.touches[0].pageX;
        this.sy = e.touches[0].pageY;
    }
    btn.ontouchend = function (e) {
        // 防止在按键时不想按，向旁边移动来取消按键；
        let changeX = Math.abs(e.changedTouches[0].pageX - this.sx); //取绝对值
        let changeY = Math.abs(e.changedTouches[0].pageY - this.sy);
        if (changeX >= 20 || changeY >= 20) return;
        
        loadingBox.style.opacity = 0;
        loadingBox.addEventListener('transitionend',function (e) {
            if(e.propertyName == 'opacity') {
                bell.play();
                loadingBox.classList.add('hide');
                phoneBoxFn(); // 第一屏完成之后再来第二屏
        }},false)
    }
}
loadBox();
// 第二屏 接电话的屏
function phoneBoxFn () {
    let circle = document.querySelector('.phoneBox .circle');
    let timeBox = document.querySelector('.phoneBox header h3');
    let footer = document.querySelector('.phoneBox footer');
    let overBox = document.querySelector('.phoneBox .overBox');
    let overBtn = document.querySelector('.overBox .overBtn');
    let phoneBox = document.querySelector('.phoneBox');
    let clearFn = null;
    circle.addEventListener('touchend', function () {
        timeBox.classList.remove('hide');//显示时间
        footer.classList.add('hide');
        overBox.classList.remove('bot');
        bell.pause();  //点击接听键，让铃声停止 声音播放
        say.play(); 
        clearFn = changeTime(); 
    },false) ; // {passive   capture} passive true 默认事件先执行  false 绑定事件先执行  
    //  capture : true 在捕获阶段触发事件  false 在冒泡阶段触发
    overBtn.addEventListener('touchend', function () {
        //点击挂机键
        say.pause();
        clearFn();//为了点击挂机键的时候清除时间定时器
        bgm.play();
        phoneBox.style.transform = 'translateY(110%)';
        phoneBox.addEventListener('transitionend', function (e) {
            console.log(e);
            chatBoxFn(); // 上一屏完全消失之后再执行第三屏
        })
    })

    function changeTime () {
        //重置时间
        let timer = setInterval(()=>{
            let t = parseInt(say.currentTime) // 当前播放的时间取整
            timeBox.innerHTML = `00:${t < 10 ? '0' + t : t}`
            if (say.ended) {
                //播放完成 说完话
                clearInterval(timer);
                bgm.play();
                phoneBox.style.transform = 'translateY(110%)';
                phoneBox.addEventListener('transitionend', function (e) {
                    console.log(e);
                    chatBoxFn(); // 上一屏完全消失之后再执行第三屏
                })
            }
        },1000)
        return function () {
            clearInterval(timer);
        }
    }
}

// 第三屏
function chatBoxFn () {
    let oLis = document.querySelectorAll('.chatBox ul li');
    let keyboard = document.querySelector('.chatBox .keyboard');
    let p = keyboard.querySelector('p');
    let chatBtn = keyboard.querySelector('.chatBtn');
    let chatMsgBox = document.querySelector('.chatBox .chatMsgBox');
    let timer = null;
    let n = 0; //记录显示的li条数
    timer = setInterval(()=>{
        oLis[n].classList.remove('opa');
        n++;
        if (n == 3) {
            clearInterval(timer); //清除定时器
            setTimeout(()=>{
                keyboard.classList.remove('bot');
            },1000);
            setTimeout(()=>{
                input();
            },1400)
        }
    },1000)
    function input () {
        let str = '我们现在使用的是VUE和REACT';
        let m = 0;
        let timer = null;
        timer = setInterval(()=>{
            p.innerHTML += str[m];
            m++;
            if (m >= str.length) {
                clearInterval(timer);
                // 字输入完成之后，让button亮起来
                chatBtn.classList.remove('hide');
            }
        },100)
    }
    chatBtn.ontouchend = function () {
        p.innerHTML = ''; //清空输入框
        keyboard.classList.add('bot'); // 让键盘下去
        oLis[n].classList.remove('opa'); //第四条直接出现
        n++
        timer = setInterval(()=>{
            oLis[n].classList.remove('opa');
            move();
            n++;
            if (n === oLis.length) {
                //所有对话都出现
                clearInterval(timer);
            }
        },1000)
    }
    let t = 0; //记录向上移动的高度
    function move () {
        //负责让整个盒子向上移动：每次移动出现的盒子的高度
        t += oLis[n].clientHeight;
            chatMsgBox.style.transform = `translateY(-${t}px)`
    }
}
