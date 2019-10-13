var animate = (function () {
    var moveType = { //各种不同的运动轨迹
        linear: function linear (time, changeL, duration, beginL) {
            return changeL/duration * time + beginL;
        },
        easeIn: function (t, c, d, b) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function (t, c, d, b) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function (t, c, d, b) {
            if ((t /= d / 2) < 1) {
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            }
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    };
    function move2 (ele, obj, duration, type, cb) {
        type = type || 'linear'
        duration = duration || 1000;
        let binObj = {};
        for (let k in obj) {
            binObj[k] = parseFloat(getComputedStyle(ele)[k]);
            //获取集合里各个属性的初始值
        }
        let time = 0; //记录运动过的时间
        let l = {};
        let timer = setInterval(()=>{
            time += 20;
            for (let k in binObj) {
                l[k] = moveType[type](time, obj[k] - binObj[k], duration, binObj[k])
            }
            if (time >= duration) {
                l = obj;
                clearTimeout(timer);
                cb && cb(); //回调函数存在时执行它
            }
            for(let k in obj) {
                ele.style[k] = l[k] + (k === 'opacity' ? '' : 'px')
            }
        }, 20)
    }
    return function (ele, obj, duration, type, cb) {
        if (typeof duration === 'function') {
            cb = duration;
            duration = 1000;
        }
        if (typeof type === 'function') {
            cb = type;
            type = 'linear';
        }
        if (typeof duration === 'string') {
            type = duration;
            duration = 1000;
        }
        move2(ele, obj, duration, type, cb);
    }
})()