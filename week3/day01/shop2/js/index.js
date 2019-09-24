let data = null;
var xhr = new XMLHttpRequest();
xhr.open('get', './data.json',true);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        data = JSON.parse(xhr.response);
        console.log(data)
        render(data);
        myBind(data);
    }
}
xhr.send();
let box = document.getElementById('box');
let time_btn = document.getElementById('time_btn'),
    price_btn = document.getElementById('price_btn'),
    comment_btn = document.getElementById('comment_btn');
function render (ary) {
    let str = '';
    ary.forEach(item=>{
        let {img, title, price, num, time} = item;
        str += `<li>
                    <div class="img">
                        <img src="${img}" alt="">
                    </div>
                    <div class="til">${title}</div>
                    <div class="desc">${time}</div>
                    <div class="price">￥${price}</div>
                    <div class="bot_box">
                        <div>选购</div>
                        <div>${num}评论</div>
                    </div>
                </li>`
    })
    box.innerHTML = str;
};
function myBind (data) {
     time_btn.flag = price_btn.flag = comment_btn.flag = 1;
     function click (btn,n){
        btn.onclick = function () {
            this.flag *= -1;
            data.sort((a,b)=>{
               return (a[n] - b[n])*this.flag;
            })
            render(data);
        }
     }
    click(time_btn, 'time');
    click(price_btn, 'price');
    click(comment_btn, 'num');
}
