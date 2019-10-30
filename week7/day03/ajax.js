
// 自己封装一个ajax方法；
function ajax (options) {
    let {method='get',url='',data={},async=true,cache=true,headers={},success,error} = options;  //对象的解构, 前面的是给的默认值；
    method = method.toLowerCase();  //防止大写
    let str = '';
    for (let k in data) {
        str += `${k}=${data[k]}&`
    }
    str = str.replace(/&$/,'');
    if (method == 'get') {
        // 判断之前的url上面有没有问号
        if (url.indexOf('?') == -1) {
            url += '?' + str;
        } else {
            url += '&' +str;
        }
        if (!cache) { //不走缓存时，需要在url后面补一个随机字符
            url += '&_=' + Date.now();  //加了个时间戳  Date.now() 是 new Date().getTime();
        } 
    } 
    let xhr = new XMLHttpRequest();
    xhr.open(method,url,async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (/200|304/.test(xhr.status)) {
                let data;
                try {   // 为了防止后台直接返回一个空字符串 这时JSON.parse会报错
                    data = JSON.parse(xhr.response);
                } catch (error) {
                    data = xhr.response;
                }
                success && success(data)
            } else if (/[45]\d{2}/.test(xhr.status)) {
                error && error(xhr);
            }
        }
    }
    headers = Object.assign({'content-type':'application/x-www-form-urlencoded'},headers)
    for (let k in headers) {
        // headers 的属性值不能是中文  所以需要编码一下 因为escape后台能直接解码，所以用这个
        xhr.setRequestHeader(k,escape(headers[k]));
    }
    xhr.send(str);
}

// loadsh.js  _.cloneDeep  深拷贝