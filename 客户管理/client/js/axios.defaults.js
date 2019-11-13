axios.defaults.baseURL = 'http://127.0.0.1:8888';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
axios.defaults.transformRequest = function (data={}) {
    let str = '';
    for (let k in  data) {
        str += `${k}=${data[k]}&`;
    }
    return str.replace(/&$/,'');
};
axios.interceptors.request.use(function (config) {
    return config;
},function (err){
    return Promise.reject(err);
});
axios.interceptors.response.use(function (data) {
    return data.data;
}, function (err){
    return Promise.reject(err)
});
