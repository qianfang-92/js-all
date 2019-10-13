class Banner {
    constructor (idSelector) {
        this.box = document.querySelector(idSelector);
        this.data = null;
        this.ul = this.box.querySelector('.img_box ul');
        this.tipBox = this.box.querySelector('.tip_box');
        this.tips = this.box.getElementsByClassName('tip');
        this.leftBtn = this.box.querySelector('.left_btn');
        this.rightBtn = this.box.querySelector('.right_btn');
        this.n = 0;
        this.timer = null;
        this.ul.style.transition = 'left 0.5s linear';
        this.getData(); //获取数据；
    }
    getData () {
        let xhr = new XMLHttpRequest();
        xhr.open('get', './data.json', true);
        xhr.onreadystatechange = ()=>{
            if (xhr.readyState == 4 && /200|304/.test(xhr.status)) {
                this.data = JSON.parse(xhr.response);
                console.log(this.data);
                this.render(this.data);
                this.move(this.n); //数据渲染完成之后再开启动画
                this.tipClick();
                this.binEvent();
            }
        }
        xhr.send();
    }
    render (data) {
        data = data || [];
        let str = '';
        let tipStr = '';
        data.push(data[0]); // 为了在最后补一张一样的图
        data.forEach((item,index)=>{
            let {img, desc} = item;
            str += `<li>
                        <img src="${img}" alt="">
                        <p class="desc">${desc}</p>
                    </li>`;
            if(index !== data.length - 1){
                if(index == 0) {
                    //只有第一项才有默认的current属性
                    tipStr += `<span class="tip current"></span>\n`
                } else {
                    tipStr += `<span class="tip"></span>\n`
                }
            }
            
        })
        this.ul.innerHTML = str;
        this.tipBox.innerHTML = tipStr;
        this.ul.style.width = data.length*590 + 'px' ;// 更新盒子的宽度，让新增的那个图和其他的li放一排
    }
    move () {
        this.timer = setInterval(()=>{
            this.change()
        },2000)
    }
    change () {
        this.n++; //n等于4的时候，显示的是第五张图片，也就是新加上的第一张图片
        if (this.n == this.tips.length + 1) {
            this.ul.style.transition = null;
            this.ul.style.left = '0px'; //让图片直接闪到第一张，紧接着向第二张图移动
            this.n = 1
        }
        this.tipClass(this.n);
        // animate(ul,{left:(-590)*n},500)
        setTimeout(()=>{   
            //  同步情况下，代码从上到下执行的时候，只会让下面的代码起作用，上边的代码会被覆盖
            //异步情况下，异步代码会被忽略掉，不会等异步执行，同步会先执行，完事之后，异步再去执行
            this.ul.style.transition = 'left 0.5s linear'
            this.ul.style.left = -590*this.n + 'px';
        },20)

        
    }
    tipClass (m) {
        m = (m >= this.tips.length ? 0 : m); //当m大于tips的数量时，它等于第一张
        for (let i = 0; i < this.tips.length; i++) {
            this.tips[i].className = 'tip';
        }
        this.tips[m].className = 'tip current';
    }
    tipClick = ()=>{
        for (let i = 0; i < this.tips.length; i++) {
            this.tips[i].onclick = ()=>{
                this.n = i;
                this.tipClass(this.n)
                this.ul.style.left = -590*this.n + 'px';
            }
        }
    }
    binEvent () {
        // 负责绑定事件
        this.box.onmouseenter = ()=>{
            clearInterval(this.timer);
        }
        this.box.onmouseleave = ()=>{
            this.move();
        }
        this.leftBtn.onclick = this.debounce(()=>{
            this.n--;
            // n == -1 的时候，我们要瞬间闪到最后一张
            if(this.n < 0) {
               this.ul.style.transition = null;
               this.ul.style.left = (-590)*this.tips.length + 'px';
               this.n = this.tips.length - 1
            }
            this.tipClass(this.n);
            setTimeout(()=>{
                this.ul.style.transition = 'left 0.5s linear';
                this.ul.style.left = -590*this.n + 'px';
            })
        })
        this.rightBtn.onclick = this.debounce(()=>{
            this.change();
        })
        function throttle (f) {
            var flag = true;
            return function () {
                if (!flag) return;
                flag = false;
                setTimeout(()=>{
                    flag = true;
                    f.apply(this,arguments)
                },500)
            }
        }
    }
    debounce (f) {
        var timer = null;
        return function () {
            if (timer == null) {
                f.apply(this, arguments);
                timer = 0;
                return;
            }
            clearInterval(timer);
            timer = setTimeout(()=>{
                f.apply(this,arguments);
                timer = null;
            },500)
        }
    }
}
new Banner('#box')
new Banner('#box2')
new Banner('#box3')