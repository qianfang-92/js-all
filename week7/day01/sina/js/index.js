
function swip () {
    var swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
        loop:true
      });
  
}
    
    function getData (url, cb) {
        let xhr = new XMLHttpRequest();
        xhr.open('get', url,true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
                let data = JSON.parse(xhr.response);
                console.log(data);
                cb && cb(data);
            }
        }
        xhr.send();
    }
    getData('./data/banner.json', function (data) {
        render(data);
        swip();
    });

    getData('./data/list.json', function (data) {
        renderlist(data)
    })

    function render (ary) {
        let str = '';
        let banner = document.querySelector('.ba');
        ary.forEach(item=>{
            let {img,title} = item;
            str += `<div class="swiper-slide"> 
                        <img src="${img}" alt="">
                        <p>${title}</p>
                    </div>`
        })
        banner.innerHTML = str;
    }

    function renderlist (ary) {
        let str = '';
        let list = document.querySelector('.lis');
        ary.forEach(item=>{
            if (item.img !== []) {
                str += `<li>
                            <div class="word">
                                <p>战乱民不聊生美国国务卿希拉里克林顿</p>
                                <div>
                                    <span class="icon_com"></span>
                                    <span>${item.commentNum}</span>
                                </div>
                            </div>
                            <div class="img">
                                <img src="${item.img[0]}" alt="">
                            </div>
                        </li>`
            } else {
                str += `<li>
                            <div class="word">
                                <p>战乱民不聊生美国国务卿希拉里克林顿</p>
                                <div>
                                    <span class="icon_com"></span>
                                    <span>${item.commentNum}</span>
                                </div>
                            </div>
                            <div class="img">
                            </div>
                        </li>`
            }
        })
        list.innerHTML = str;
    }

