class Drag {
    constructor (id) {
        this.box = document.getElementById(id);
        this.Start = this.start.bind(this);
        this.Move = this.move.bind(this);
        this.End = this.end.bind(this);
        on(this.box, 'mousedown', this.Start)
    }
    start (e) {
        this.startX = this.offset(this.box).l;
        this.startY = this.offset(this.box).t;
        this.spx = e.pageX;
        this.spy = e.pageY;

        on(document, 'mousemove', this.Move);
        on(document, 'mouseup', this.End);
        fire(this.box,'myIndex',this.box);
    }
    move (e) {
        this.box.style.left = e.pageX - this.spx + this.startX + 'px';
        this.box.style.top = e.pageY - this.spy + this.startY + 'px';
    }
    end (e) {
        off(document, 'mousemove', this.Move);
        off(document, 'mouseup', this.End);
    }
    clear () {
        off(this.box, 'mousedown',this.Start)
    }
    offset (ele) {
        let l = ele.offsetLeft,
            t = ele.offsetTop;
        let temp = ele.offsetParent;
        while (temp) {
            l += temp.offsetLeft + temp.clientLeft;
            t += temp.offsetTop + temp.clientTop;
            temp = temp.offsetParent;
        }
        return {
            l,
            t
        }
    }
}