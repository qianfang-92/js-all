class Drag{
    constructor(id,ary){
        this.ary = ary || {
            range:document, // 可以拖动的区间  默认整个document
            count:Infinity }// 可以拖动的次数  默认无限次}
        this.ary.range = this.ary.range || document;
        this.ary.count = this.ary.count || Infinity;
        this.n = this.ary.count;
        this.m = 0;
        this.box = document.getElementById(id);// 要操作的元素
        this.START = this.start.bind(this);
        this.MOVE = this.move.bind(this);
        this.END = this.end.bind(this);
        this.box.addEventListener('mousedown',this.START,false);
    }
    start(e){
        this.startX = this.offset(this.box).l;
        this.startY = this.offset(this.box).t;// 盒子的初始位置

        this.startPx = e.pageX;
        this.startPy = e.pageY;// 鼠标的初始位置；

        document.addEventListener('mousemove',this.MOVE,false)
        document.addEventListener('mouseup',this.END,false)
    }
    move(e){
        let l = this.startX + e.pageX - this.startPx,
            t = this.startY + e.pageY - this.startPy;// l t 是盒子当前的位置
        if(this.ary.range !== document) {
            l = l <= this.ary.range[0] ? this.ary.range[0] : (l >= this.ary.range[2] ? this.ary.range[2] : l);
            t = t <= this.ary.range[1] ? this.ary.range[1] : (t >= this.ary.range[3] ? this.ary.range[3] : t);
        }
        this.box.style.left = l + 'px';
        this.box.style.top = t + 'px';    
    }
    clear() {
        this.box.removeEventListener('mousedown',this.START,false)
    }
    end(){
        this.m++;
        if (this.m >= this.n) {
            this.clear();
        }
        document.removeEventListener('mousemove',this.MOVE,false);
        document.removeEventListener('mouseup',this.END,false);
    }
    offset(ele) {
        let t = ele.offsetTop,
            l = ele.offsetLeft,
            temp = ele.offsetParent;
        while (temp) {
            t += temp.offsetTop + temp.clientTop;
            l += temp.offsetLeft + temp.clientLeft;
            temp = temp.offsetParent
        }
        return {
            l,
            t
        }
    }
}