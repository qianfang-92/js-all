function on(ele, type, f) {
    if (/^my/.test(type)) {
        // 不是原生事件，我们需要自己创造一个事件池  自己规定my开头的都是自定义事件
        ele[type] = ele[type] || [];
        ele[type].push(f);
    } else {
        type = type.replace(/^on/, ''); // 防止输入时多输入一个on字符
        ele.addEventListener(type, f, false);  //addEventListener 自带事件池，不需要造事件池
    }
}
function fire(ele, type, ...arg) {
    if (/^my/.test(type)) {  //不是原生事件时执行
        ele[type] = ele[type] || [];
        ele[type].forEach(item => {
            item.call(this, ...arg)
        })
    }
}
function off(ele, type, f) {
    if (/^my/.test(type)) {
        ele[type] = ele[type] || [];
        let i = ele[type].indexOf(f);
        if (i !== -1) {
            ele[type].splice(f,1)
        }
    } else {
        ele.removeEventListener(type,f,false);
    }
}