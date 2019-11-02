function ajax(options) {
    let {method='get',url='',data={},async=true,cache=true,headers={},success,error} = options;
    method = method.toLowerCase();
    let str = '';
    for (let k in data) {
        str += `${k}=${data[k]}&`
    }
    str = str.replace(/&$/,'');
    if (method == 'get') {
        if (url.indexOf('?') !== -1) {
            url += '&' + str;
        } else {
            url += '?' + str;
        }
        if (!cache) {
            url += '&_=' + Date.now();
        }
    }
    
    let xhr = new XMLHttpRequest();
    xhr.open(method,url,async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4){
            if (/200|304/.test(xhr.status)) {
                let data;
                try {
                    data = JSON.parse(xhr.response);
                } catch (error) {
                    data = xhr.response;
                }
                success && success(data);
            } else if (/[45]\d{2}/.test(xhr.status)) {
                error && error(xhr);
            }
        }
    }
    headers = Object.assign({'content-type':'application/x-www-form-urlencoded'},headers);
    for (let k in headers ){
        xhr.setRequestHeader(k,escape(headers[k])); // 为了处理中文
    }
    
    xhr.send(str);
}