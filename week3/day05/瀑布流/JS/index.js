//先获取数据
let data = null;
function getData() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', './data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
            data = JSON.parse(xhr.response);
            // console.log(data);
            render(data);
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
                    <img src="${pic}" realSrc='${pic}' alt="" style='height:${height}px'>
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

}



