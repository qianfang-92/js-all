//先获取数据
let data = null;
let flag = true;
function getData() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
            flag = false;
            data = JSON.parse(xhr.response);
            // console.log(data);
            render(data);
            loadAll();
        }
    }
    xhr.send();
}
getData();

let body = document.getElementsByClassName('body')[0],
    oLis = body.getElementsByTagName('li');
    console.log(oLis)
function render(data) {
    //data是后台给的数组，
    // 循环数组，拼接字符串，把拼接好的字符串放在页面上
    let str = '';
    data.forEach(item => {
        let { pic, author, desc, height } = item;
        str = `<div class="img_box">
                    <img src="./img/1.jpg" realSrc='${pic}' alt="" style='height:${height}px'>
                    <p class="desc">${desc}</p>
                    <p class="author">${author}</p>
                </div>`
        //str是新拼出来的一个块，我们需要决定的是这个块放在哪个li里
        let temp = getMinLi();
        temp.innerHTML += str;
        // let div = document.createElement('div');
        // div.className = 'pic_box'
        // div.innerHTML = str;
        // temp.appendChild(div);
    })
    console.log(1)
}

function getMinLi () {
    return [...oLis].sort((a,b)=>{
        return a.clientHeight - b.clientHeight;
    })[0]
}

function loadMore () {
    if (flag) return;
    let temp = getMinLi(),
        scT = document.documentElement.scrollTop,
        wH = utils.winH().h,
        h = utils.offset(temp).t + temp.clientHeight;
    if (scT + wH > h) {
        getData()
        console.log(666)
    }
}

function loadAll () {
    let imgs = document.querySelectorAll('.body img');
    [...imgs].forEach(item=>loadImg(item))
}

function loadImg (ele) {
    if (ele.flag) return;
    let scT = document.documentElement.scrollTop;
    let wH = utils.winH().h;
    let h = utils.offset(ele).t;
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
        num += 0.2;
        if (num >= 1) {
            num = 1;
            clearInterval(ele.timer)
        }
        ele.style.opacity = num
    },10)
}

window.onscroll = function () {
    this.loadMore();
    this.loadAll();
}


