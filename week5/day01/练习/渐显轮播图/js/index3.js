class Banner {
    constructor (idSelector) {
        this.$box = $(idSelector);
        this.$ul = this.$box.find('ul');
        this.$tipBox = this.$box.find('.tip_box');
        this.$lis = this.$ul.children('li');
        this.$tips = this.$tipBox.children('.tip');
        this.$leftBtn = this.$box.find('.left_btn');
        this.$rightBtn = this.$box.find('.right_btn');
        this.n = 0;
        this.timer = null;
        this.getData();
    }
    getData () {
        $.ajax({
            type : 'get',
            url : './data.json',
            success : (data)=>{
                this.render(data);
                this.autoMove();
                this.binEvent();
            }
        })
    }
    render (ary) {
        let str = '',
            tipStr = '';
        ary.push(ary[0]);
        ary.forEach((item,index)=>{
            str += `<li>
                        <img src="${item.img}" alt="">
                        <p class="desc">${item.desc}</p>
                    </li>`
            if (index < ary.length - 1) {
                tipStr += (index == 0 ? `<span class="tip current"></span>\n` : `<span class="tip"></span>\n`)
            }
        })
        this.$ul.html(str);
        this.$tipBox.html(tipStr);
        this.$ul.css({width:590*ary.length});
        this.$lis = this.$ul.children('li');
        this.$tips = this.$tipBox.children('.tip');
    }
    move () {
        this.n++;
        if (this.n > this.$tips.length) {
            this.$ul[0].style.transition = null;
            this.$ul.css({left:0});
            this.n = 1;
        }
        // console.log(this.n)
        setTimeout(()=>{
            this.$ul.css({transition:'left 0.5s linear'});
            this.$ul[0].style.left = -590*this.n + 'px'
        },20)
        this.autoFocus(this.n);
    }

    autoMove () {
        this.timer = setInterval(()=>{
            this.move();
        },2000)
    }

    autoFocus (m) {
        if (m >= this.$tips.length) {
            m = 0;
        }
        this.$tips.eq(m).addClass('current').siblings().removeClass('current');
    }

    binEvent () {
        this.$box[0].onmouseenter = ()=>{
            clearInterval(this.timer);
        }
        this.$box[0].onmouseleave = ()=>{
            this.autoMove();
        }
        this.$leftBtn.on('click', ()=>{
            this.n--;
            if (this.n < 0) {
                this.$ul[0].style.transition = null;
                this.$ul[0].style.left = -590*this.$tips.length + 'px';
                this.n = this.$tips.length - 1;
            }
            setTimeout(()=>{
                this.$ul.css({transition:'left 0.5s linear'});
                this.$ul[0].style.left = -590*this.n + 'px'
            },20)
            this.autoFocus(this.n);
            
        })
        this.$rightBtn.on('click', ()=>{
            this.move();
        })
        this.tipClick =()=>{
            // console.log(this.$tips.length)
            for (let i = 0; i < this.$tips.length; i++) {
                this.$tips[i].onclick = ()=>{
                    this.n = i;
                    this.$ul[0].style.left = -590*this.n + 'px';
                    this.autoFocus(this.n)
                }
            }
        }
        this.tipClick();
    }
}

new Banner('#box')