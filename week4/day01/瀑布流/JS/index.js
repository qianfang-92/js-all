//获取后台数据
let data = null;
let oLis = document.querySelectorAll('.body li');
let box = document.getElementsByClassName('body')[0];
let imgs = box.getElementsByTagName('img');
let flag = false;
function getData () {
    flag = true;
    let xhr = new XMLHttpRequest();
    xhr.open('get','./data.json', true);//true是异步 false是同步
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /200|304/.test(xhr.status)) {
            data = JSON.parse(xhr.response)
            render(data);
            flag = false;//代表新数据渲染完成之后的操作
            loadAll();
        }
    }
    xhr.send();
}
getData();

function render (data) {
    let str = '';
    data.forEach((item,index)=>{
        let {pic, desc, author, height} = item;
        str = `<div class="img_box">
                    <img src="./img/1.jpg" realSrc="${pic}" alt="" style="height:${height}px">
                    <p class="desc">${desc}</p>
                    <p class="author">${author}</p>
                </div>`
        // oLis[index%5].innerHTML += str;
        let temp = getMinLi();
        // temp.innerHTML += str;//这行重新赋值了，把整列都换了，会造成屏幕新加载的时候会闪屏 所以要像下面
        let box = document.createElement('div');
        box.innerHTML = str;
        temp.appendChild(box);
    })
}

//找最低的那个li
function getMinLi () {
    return [...oLis].sort((a,b)=>{
        return a.clientHeight - b.clientHeight;
    })[0]
}

//滚动加载更多；

window.onscroll = function () {
    //最短的那个li露出底部的时候加载新数据
    this.loadMore();
}


function loadMore () {
    if(flag) return;//当flag是true时，代表数据还没加载完或者正在加载，这时不要再加载更多
    let temp = getMinLi();
    let scT = document.documentElement.scrollTop,
        wH = utils.winH().h,
        h = utils.offset(temp).t + temp.clientHeight;
    if (scT + wH > h) {
        getData();
    }
    loadAll();
}

function loadImg (ele) {
    if (ele.flag) return;
    let scT = document.documentElement.scrollTop,
        wH = utils.winH().h,
        h = utils.offset(ele).t;
    if (scT + wH > h) {
        let realSrc = ele.getAttribute('realSrc');
        let temp = new Image();
        temp.src = realSrc;
        temp.onload = function () {
            ele.src = realSrc;
            temp = null;
            ele.flag = true; //加载过后的图片就不用再加载了
            fadeIn(ele);
        }
    }
}

function fadeIn (ele) {
    ele.style.opacity = 0;
    let num = 0;
    ele.timer = setInterval(() => {
        num += 0.05;
        if (num >= 1) {
            num = 1;
            clearInterval(ele.timer);
        }
        ele.style.opacity = num;
    }, 10);
}

function loadAll () {
    [...imgs].slice(1,).forEach(item=>loadImg(item));
}