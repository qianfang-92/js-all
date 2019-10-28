
function swiperInit () {
    var swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
        loop:true
      });
}  // 如果刚开始就new 一个  swiper 那么在render后渲染的数据没有被获取到
let data = null;
let slideBox = document.getElementById('slideBox');
function getData (url,cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('get',url, true); // true是异步的，false是同步的
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
            data = JSON.parse(xhr.response);
            cb && cb(data);
        }
    }
    xhr.send();
}
getData('./data/banner.json',function (data) {
    render(data);
    swiperInit();
});
getData('./data/list.json', function (data) {
    console.log(data)
    renderLit(data);
})
function render (ary) {
    let str = '';
    ary.forEach(item=>{
        let {img, title} = item;
        str += `<div class="swiper-slide"> 
                    <img src="${img}" alt=""> 
                    <p>${title}</p>
                </div>`
    })
    slideBox.innerHTML = str;
}

function renderLit (ary) {
    let str = '';
    ary.forEach(item=>{
        if (item.type == 0) {
            //无图情况
            str += `<div class="list">
                        <div class="text_box">
                            <p>就坎大哈坎大哈</p>
                            <div class="comment_box">
                                <span class="icon_com"></span>
                                <span>${item.commentNum}</span>
                                <span>环球时报</span>
                            </div>
                        </div>
                    </div>`
        } else {
            //单图情况
            str += `<div class="list">
                        <div class="text_box">
                            <p>就坎大哈坎大哈</p>
                            <div class="comment_box">
                                <span class="icon_com"></span>
                                <span>${item.commentNum}</span>
                                <span>环球时报</span>
                            </div>
                        </div>
                        <div class="img_box">
                            <img src="${item.img[0]}" alt="">
                        </div>
                    </div>`
        }
    })
    document.querySelector('.list_box').innerHTML = str;
}

