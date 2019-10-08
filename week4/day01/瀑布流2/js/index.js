let data = null;
let oLis = document.querySelectorAll('.body li');
let body = document.getElementsByClassName('body')[0];
let imgs = body.getElementsByTagName('img');
let flag = false;
function getData () {
    flag = true;
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
            data = JSON.parse(xhr.response);
            console.log(data);
            render(data);
            flag = false;
            loadAll();
        }
    }
    xhr.send();
}
getData();

function render (data) {
    let str = '';
    data.forEach(item=>{
        let {pic, desc, author, height} = item;
        str = `<div class="pic_box">
                    <img src="./img/1.jpg" alt="" style="height:${height}px" realSrc="${pic}">
                    <p class="desc">${desc}</p>
                    <p class="author">${author}</p>
                </div>`
        let temp = getMinLi();
        let box = document.createElement('div');
        box.innerHTML = str;
        temp.appendChild(box);
    })
}

function getMinLi () {
    return [...oLis].sort((a,b)=>{
        return a.clientHeight - b.clientHeight;
    })[0]
}

function winH () {
    var h = document.documentElement.clientHeight || document.body.clientHeight;
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    return {
        h, w
    }
}

function offset (ele) {
    let l = ele.offsetLeft,
        t = ele.offsetTop,
        temp = ele.offsetParent;
    while (temp) {
        l += temp.offsetLeft + temp.clientLeft;
        t += temp.offsetTop + temp.clientTop;
        temp = temp.offsetParent;
    }
    return {
        l, t
    }
}

function loadMore () {
    if (flag) return;
    let scT = document.documentElement.scrollTop,
        wH = winH().h,
        temp = getMinLi(),
        h = offset(temp).t + temp.clientHeight;
    if (scT + wH > h) {
        getData()
    }
    loadAll();
}

window.onscroll = function () {
    this.loadMore();
}

function loadImg (ele) {
    if (ele.flag)return;
    let scT = document.documentElement.scrollTop,
        wH = winH().h,
        h = offset(ele).t;
    if (scT + wH > h) {
        let realSrc = ele.getAttribute('realSrc');
        let temp = new Image();
        temp.src = realSrc;
        temp.onload = function () {
            ele.src = realSrc;
            temp = null;
            ele.flag = true;
            fadeIn(ele);
        }
    }
}

function fadeIn (ele) {
    ele.style.opacity = 0;
    let num = 0;
    ele.timer = setInterval(()=>{
        num += 0.02;
        if (num >= 1) {
            num = 1;
            clearInterval(ele.timer);
        }
        ele.style.opacity = num;
    })
}

function loadAll() {
    [...imgs].slice(1, ).forEach(item=>{
        loadImg(item)
    })
}