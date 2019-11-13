let fs = require('fs');
let obj = {};
['readFile','readdir'].forEach(item=>{
    obj[item] = function (url,encoding=null) {
        if (/\.(js|css|html|txt|md|json)$/.test(url)) {
            encoding = 'utf-8';
        }
        return new Promise ((res,rej) =>{
            fs[item](url,encoding,(e,d) =>{
                if(!e) {
                    res(d)
                } else {
                    rej(e)
                }
            })
        })
    }
});
['mkdir','rmdir','unlink'].forEach(item=>{
    obj[item] = function (url) {
        return new Promise((res,rej)=>{
            fs[item](url,(e)=>{
                if (!e) {
                    res()
                } else {
                    rej(e)
                }
            })
        })
    }
});
['writeFile','appendFile'].forEach(item=>{
    obj[item] = function (url,data,encoding=null) {
        if (/\.(js|css|html|txt|md|json)$/.test(url)) {
            encoding = 'utf-8';
        }
        return new Promise ((res,rej)=>{
            fs[item](url,data,encoding,(e)=>{
                if (!e) {
                    res()
                } else {
                    rej(e)
                }
            })
        })
    }
});
obj.copyFile = function (url,Nurl) {
    return new Promise ((res,rej)=>{
        fs.copyFile(url,Nurl,(e)=>{
            if (!e) {
                res()
            } else {
                rej(e)
            }
        })
    })
};

module.exports = obj;