let {getCss, setCss, winH, offset} = utils;
let flag = false;
var oLis = document.querySelectorAll('.box>li');
function init () {
    [...oLis].forEach(item => item.innerHTML = '')
}
init();

//第一步 获取数据；
function getData () {
    flag = true;
    var xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            flag = false;
            let data = JSON.parse(xhr.response);
            console.log(data);
            render(data);
            loadAll();
        }
    }
    xhr.send();
}
getData();

//第二步  渲染数据
function render (ary) {
    ary.forEach((item, index)=>{
        let {pic, author, desc, height} = item;
        let str = `<div class="pic_box">
                        <div class="img">
                            <img src="./img/default.jpg" style= "height:${height}px" realSrc="${pic}" alt="">
                        </div>
                        <p class="desc">${desc}</p>
                        <p class="author">${author}</p>
                    </div>`
        let temp = getMin();
        temp.innerHTML += str;
    })
    //字符串拼好后，每次都往最矮的那个li添加
}

function getMin () {
    var ary = [...oLis].sort((a,b)=>{
        return a.clientHeight - b.clientHeight;
    })
    return ary[0];
}

//第三步  滚动 加载新数据；

function loadMore () {
    if(flag) return;//flag 为true时  表示数据正在加载，这时我们不应该再去加载新数据
    //什么时候加载新数据？当最短的那个li露出底部的时候
    //怎么加载新数据
    let scT = document.documentElement.scrollTop;
    let wH = winH().h;
    let temp = getMin();
    let t = offset(temp).t;
    let h = temp.clientHeight;
    if (scT + wH > h + t) {
        getData();
    }
}

window.onscroll = function () {
    loadMore();
    loadAll();
}

function loadImg (ele) {
    if (ele.flag) return;
    let scT = document.documentElement.scrollTop;
    let wH = winH().h;
    let t = offset(ele).t;
    if (scT + wH > t) {
        let realSrc = ele.getAttribute('realSrc');
        let temp = new Image();
        temp.src = realSrc;
        temp.onload = function () {
            ele.src = realSrc;
            fadeIn(ele);
            temp = null;
            ele.flag = true;
        }
    }
}

function loadAll () {
    let imgs = document.querySelectorAll('.box img');
    [...imgs].forEach(item=>loadImg(item))
}

function fadeIn (ele) {
    ele.style.opacity = 0;
    let n = 0;
    ele.timer = setInterval(()=>{
        n += 0.1;
        if (n >= 1) {
            n = 1;
            clearInterval(ele.timer);
        }
        ele.style.opacity = n;
    },10)
}