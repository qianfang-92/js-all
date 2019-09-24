//获取数据 展示到页面上；
let data = null;
let oLis = document.getElementsByTagName('li');
let oLis2 = document.querySelectorAll('li');
console.log(oLis);
console.log(oLis2);
//getElement 系列获取到的元素集合 是有 映射关系的 ；当页面上增加或减少了 对应的元素  该变量会跟着默认能改变
//query系列 获取到的元素集合  没有这种映射关系  ，获取的时候是哪些变量 那么对应的变量就永远是哪些变量
//当用其他东西解构一下，这种映射就没有了
//比如 let oLis = [...document.getElementsByTagName('li')]
let xhr = new XMLHttpRequest();//创造实例
xhr.open('get', './data.json', true);//true代表异步 false代表同步  
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        // console.log(JSON.parse(xhr.response));
        data = JSON.parse(xhr.response);
        render(data);//请求成功之后再去渲染数据
        myBind();
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
        str += `<li qqq=${price}>
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
function myBind () {
    time_btn.onclick = function () {
        let ary = [...oLis];
        ary.sort((a,b)=>{
            return (a.getAttribute('qqq') - b.getAttribute('qqq'))
        })
        ary.forEach(item=>{
            box.appendChild(item)
        })
        // box.appendChild(oLis[0]);//把第一个li元素添加到box的末尾；appendChild  若添加的是页面上已经存在的元素，那么 只是相当于改变一下元素的位置，不会新增
        //这相当于整个结构动了一下，每次append都会渲染一次，这叫回流 DOM的回流
        //DOM回流 当页面的结构发生改变时，需要浏览器重新渲染页面,
        //DOM的重绘 结构不发生改变，只是样式需要修改的时候，也就是只需要重新渲染对应的css的时候；凡是引起元素位置改变的样式修改也会导致回流
    }
}
var a = document.createDocumentFragment();//文档碎片