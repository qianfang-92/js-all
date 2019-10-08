var utils = {
    getCss (ele, attr) {
        var str = getComputedStyle(ele)[attr];
        if (!str.match(/([^ ]+) ([^ ]+)/g)) {
            return parseFloat(str);
        } else {
            return str;
        }
    },
    setCss (ele, attr, val) {
        if (/([^ ]+) ([^ ]+)/.test(attr)) {
            ele.style[attr] = parseFloat(val) +'px';
        } else {
            ele.style[attr] = val;
        }
    },
    winH () {
        var h = document.documentElement.clientHeight || document.body.clientHeight;
        var w = document.documentElement.clientWidth || document.body.clientWidth;
        return {
            h, w
        }
    },
    offset (ele) {
        let l = ele.offsetLeft,
            t = ele.offsetTop,
            temp = ele.offsetParent;
        while (temp) {
            l += temp.clientLeft + temp.offsetLeft;
            t += temp.clientTop + temp.offsetTop;
            temp = temp.offsetParent;
        }
        return {
            l, t
        }
    }
}