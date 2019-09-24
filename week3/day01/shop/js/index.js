//获取数据 展示到页面上；
let data = null;
let xhr = new XMLHttpRequest();//创造实例
xhr.open('get', './data.json', true);//true代表异步 false代表同步  
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        // console.log(JSON.parse(xhr.response));
        data = JSON.parse(xhr.response);
        render(data);//请求成功之后再去渲染数据
        myBind(data);
    }
}
xhr.send();
let box = document.getElementById('box'),
    time_btn = document.getElementById('time_btn'),
    price_btn = document.getElementById('price_btn'),
    comment_btn = document.getElementById('comment_btn');
function render (ary) {
    //把数据渲染到页面上
    console.log(ary);//ary就是后台传过来的数组
    let str = '';
    ary.forEach(item=>{
        var {img, title, price, num} = item;
        str += `<li>
                    <div class="img_box">
                        <img src="${img}"
                            alt="">
                    </div>
                    <div class="til">${title}</div>
                    <div class="desc">${title}</div>
                    <div class="price">￥${price}</div>
                    <div class="bot_box">
                        <div>选购</div>
                        <div>${num}评论</div>
                    </div>
                </li>`
    })
    //str就是拼接好的字符串；拼好的字符串 要放在ul里
    box.innerHTML = str;
}
//点击上架时间 按上架时间排序
function myBind (data) {
    time_btn.falg = price_btn.falg = comment_btn.falg = 1;
    //myBind就是实现了一个 所有按钮的事件绑定 功能
    // time_btn.onclick = function () {
    //     this.falg *= -1;
    //     data.sort((a,b)=>{
    //        return (a.time - b.time)*this.falg
    //     })
    //     render(data);//把排好序之后的数组重新渲染
    // }
    // price_btn.onclick = function () {
    //     this.falg *= -1;
    //     data.sort((a,b)=>{
    //        return (a.price - b.price)*this.falg
    //     })
    //     render(data);//把排好序之后的数组重新渲染
    // }
    // comment_btn.onclick = function () {
    //     this.falg *= -1;
    //     data.sort((a,b)=>{
    //        return (a.num - b.num)*this.falg
    //     })
    //     render(data);//把排好序之后的数组重新渲染
    // }

    //可以把上面的几个 封装成一个函数
    function click (ele, key) {
        ele.onclick = function () {
            this.falg *= -1;
            data.sort((a,b)=>{
               return (a[key] - b[key])*this.falg
            })
            render(data);//把排好序之后的数组重新渲染
        }
    }
    click(time_btn,'time');
    click(price_btn,'price');
    click(comment_btn, 'num');

}
