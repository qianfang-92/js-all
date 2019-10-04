var utils = {
    getCSS (ele, attr) {
        var str = getComputedStyle(ele)[attr];
        if (!str.match(/([^ ] [^ ])/g)) {
            return parseFloat(str);
        } else {
            return str;
        }
    },

    setCSS (ele , attr, val) {
        if (!/[^ ] [^ ]/.test(attr)) {
            ele.style[attr] = parseFloat(val) + 'px';
        } else {
            ele.style[attr] = val;
        }
    },

    winH () {
        //获取当前屏幕的高度
        var h = document.documentElement.clientHeight || document.body.clientHeight;
        //获取当前屏幕的宽度
        var w = document.documentElement.clientWidth || document.body.clientWidth;
        return {
            h,w
        }
    },
    offset (ele) {
        var l = ele.offsetLeft,
            t = ele.offsetTop,
            temp = ele.offsetParent;
        while (temp) { //body的上级参照物是null
            l += temp.clientLeft + temp.offsetLeft;
            t += temp.clientTop + temp.offsetTop;
            temp = temp.offsetParent;
        }
        return {
            l, t
        }
    }
}