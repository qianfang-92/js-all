let bell = document.getElementById('bell');
let say = document.getElementById('say');
let music = document.getElementById('music');
function loadBox () {
    let loading = document.querySelector('.loadingBox .loading');
    let loadingBox = document.querySelector('.loadingBox');
    let btn = document.querySelector('.loadingBox .btn');
    let ary = ['phone-bg.jpg','phone-listen.png', 'phone-key.png', 'phone-logo.png', 'phone-name.png', 'message-head1.png', 'message-head2.png', 'message-keyboard.png', 'cube-bg.jpg', 'cube-img1.png', 'cube-img2.png', 'cube-img3.png', 'cube-img4.png', 'cube-img5.png', 'cube-img6.png', 'cube-tip.png', 'menu-icon.png', 'concat-address.png', 'concat-icon1.png', 'concat-icon2.png', 'course-icon1.png', 'course-icon2.png', 'course-icon3.png', 'course-icon4.png', 'course-icon5.png', 'course-icon6.png', 'course-icon7.png', 'course-pocket.png', 'school-bot1.png', 'school-bot2.png', 'school-img1.jpg', 'school-img2.jpg', 'school-img3.jpg', 'teacher-title.png', 'zf-detailsReturn.png', 'zf-jobTable.png', 'zf-teacher1.png', 'zf-teacher2.png', 'zf-teacher3.jpg', 'zf-teacher4.png', 'zf-teacher5.png', 'zf-teacher6.png'];
    let n = 0; //记录加载的图片张数
    ary.forEach(item=>{
        let img = new Image();
        img.src = `./images/${item}`;
        img.onload = function () {
            n++;
            let per = n/ary.length;
            loading.style.width = per*100 + '%';
            if (n == ary.length) {
                loading.addEventListener('transitionend', function () {
                    btn.classList.remove('hide');
                })
            }
        }
    })
    btn.addEventListener('touchend', function () {
        loadingBox.style.opacity = 0;
        loadingBox.addEventListener('transitionend', function (e) {
            if(e.propertyName == 'opacity') {
                loadingBox.classList.add('hide');
                phoneBoxFn(); // 第一屏完成之后再来第二屏
                bell.play();
        }},false)
    })
}
loadBox();

// 第二屏
function phoneBoxFn () {
    let phoneBox = document.querySelector('.phoneBox');
    let circle = document.querySelector('.phoneBox .circle');
    let overBox = phoneBox.querySelector('.overBox');
    let ring = phoneBox.querySelector('.ring');
    let p = phoneBox.querySelector('.time');
    let over = phoneBox.querySelector('.over');
    circle.addEventListener('touchend', function () {
        ring.classList.add('hide');
        overBox.classList.remove('bot');
        p.classList.remove('hide');
        bell.pause();
        say.play();
        time();
    })
    over.addEventListener('touchend', function () {
        phoneBox.style.opacity = 0;
        phoneBox.addEventListener('transitionend', function () {
            phoneBox.classList.add('hide');
            chatBoxFn();
            say.pause();
            music.play();
        })
    })
    function time () {
        let n = 0;
        let timer = setInterval(()=>{
            n++;
            p.innerHTML = `00:${n < 10 ? '0'+ n : n}`;
            if (n >= 25) {
                clearInterval(timer);
            }
        },1000)
    }
}

function chatBoxFn () {
    let chatBox = document.querySelector('.chatBox');
    let ul = chatBox.querySelector('ul');
    let lis = ul.querySelectorAll('li');
    let send = chatBox.querySelector('.send');
    let mesBox = chatBox.querySelector('.mesBox');
    let mess = chatBox.querySelector('.mess');
    let timer = null;
    let n = 0; // 记录第几个li显示；
    
    timer = setInterval(()=>{
        lis[n].classList.remove('opa');
        n++;
        if (n == 3) {
            clearInterval(timer);
            setTimeout(()=>{
                send.classList.remove('bot');
                send.addEventListener('transitionend', function () {
                    mesBox.classList.remove('hide');
                    input();
                })
            },1000)
        }
        
    },1400)

    function input () {
        mess.classList.remove('hide');
        let str = '我们现在使用的是VUE和REACT';
        let n = 0;
        let timer = setInterval(()=>{
            mess.innerHTML += str[n];
            n++;
            if (n >= str.length) {
                clearInterval(timer);
            }
        },200)
    }

    
        mesBox.ontouchend = function () {
            mess.innerHTML = '';
            send.classList.add('bot');
                lis[n].classList.remove('opa');
                n++;
                timer = setInterval(()=>{
                    lis[n].classList.remove('opa');
                    up();
                    n++;
                    if (n >= lis.length) {
                        clearInterval(timer);
                    }
                },1400)
            
        }
    
    let t = 0;
    function up () {
         t += lis[n].clientHeight;
        ul.style.transform = `translateY(-${t}px)`
        
    }
}


