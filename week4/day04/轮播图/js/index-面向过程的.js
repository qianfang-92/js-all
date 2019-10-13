//获取数据
let data = null;
let ul = document.querySelector('.img_box ul');
let box = document.getElementById('box');
let tipBox = document.querySelector('#box .tip_box')
let tips = box.getElementsByClassName('tip');
let leftBtn = document.querySelector('#box .left_btn');
let rightBtn = document.querySelector('#box .right_btn');
let n = 0;
let timer = null;
ul.style.transition = 'left 0.5s linear';
function getData () {
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
            data = JSON.parse(xhr.response);
            console.log(data);
            render(data);
            move(n); //数据渲染完成之后再开启动画
            tipClick();
        }
    }
    xhr.send();
}
getData();

//渲染数据
function render (data) {
    data = data || [];
    let str = '';
    let tipStr = '';
    data.push(data[0]); // 为了在最后补一张一样的图
    data.forEach((item,index)=>{
        let {img, desc} = item;
        str += `<li>
                    <img src="${img}" alt="">
                    <p class="desc">${desc}</p>
                </li>`;
        if(index !== data.length - 1){
            if(index == 0) {
                //只有第一项才有默认的current属性
                tipStr += `<span class="tip current"></span>\n`
            } else {
                tipStr += `<span class="tip"></span>\n`
            }
        }
        
    })
    ul.innerHTML = str;
    tipBox.innerHTML = tipStr;
    ul.style.width = data.length*590 + 'px' ;// 更新盒子的宽度，让新增的那个图和其他的li放一排
}


function move () {
    timer = setInterval(()=>{
        change()
    },2000)
}

function change () {
    n++; //n等于4的时候，显示的是第五张图片，也就是新加上的第一张图片
    if (n == tips.length + 1) {
        ul.style.transition = null;
        ul.style.left = '0px'; //让图片直接闪到第一张，紧接着向第二张图移动
        n = 1
    }
    tipClass(n);
    // animate(ul,{left:(-590)*n},500)
    setTimeout(()=>{   
        //  同步情况下，代码从上到下执行的时候，只会让下面的代码起作用，上边的代码会被覆盖
        //异步情况下，异步代码会被忽略掉，不会等异步执行，同步会先执行，完事之后，异步再去执行
        ul.style.transition = 'left 0.5s linear'
        ul.style.left = -590*n + 'px';
    },10)
    
}

//盒子划入时关闭定时器
box.onmouseenter = function () {
    clearInterval(timer);
}

//盒子划出时重启定时器
box.onmouseleave = function () {
    move()
}

//处理tip 类名的函数
function tipClass (m) {
    m = (m >= tips.length ? 0 : m); //当m大于tips的数量时，它等于第一张
    for (let i = 0; i < tips.length; i++) {
        tips[i].className = 'tip';
    }
    tips[m].className = 'tip current';
}

//点击左右按钮时的操作
leftBtn.onclick = throttle(function () {
    n--;
    // n == -1 的时候，我们要瞬间闪到最后一张
    if(n < 0) {
       ul.style.transition = null;
       ul.style.left = (-590)*tips.length + 'px';
       n = tips.length - 1
    }
    tipClass(n);
    setTimeout(()=>{
        ul.style.transition = 'left 0.5s linear';
        ul.style.left = -590*n + 'px';
    })
})
rightBtn.onclick = throttle(function () {
    change();
})

function tipClick () {
    for (let i = 0; i < tips.length; i++) {
        tips[i].onclick = function () {
            n = i;
            tipClass(n)
            ul.style.left = -590*n + 'px';
        }
    }
}

function throttle (f) {
    var flag = true;
    return function () {
        if (!flag) return;
        flag = false;
        setTimeout(()=>{
            flag = true;
            f.apply(this,arguments)
        },1000)
    }
}

function debounce (f) {
    var timer = null;
    return function () {
        if (timer == null) {
            f.apply(this, arguments);
            timer = 0;
            return;
        }
        clearInterval(timer);
        timer = setTimeout(()=>{
            f.apply(this,arguments)
        },500)
    }
}