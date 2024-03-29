axios.defaults.baseURL = 'http://127.0.0.1:8888';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true; // 默认false 跨域时不携带cookie  改成true  就是跨域时携带cookie
axios.defaults.transformRequest = function (data={}) {
    // 处理post请求的参数，转成search字符串
    let str = '';
    for (let k in data) {
        str += `${k}=${data[k]}&`;
    }
    return str.replace(/&$/,'');
}
// 请求拦截
axios.interceptors.request.use(function (config) {
    return config;
}, function (err) {
    return Promise.reject(err);
})
//响应拦截
axios.interceptors.response.use((response)=>{
    return response.data;
}, (err)=>{
    return Promise.reject(err);
})