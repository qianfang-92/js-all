var btn = document.getElementById('btn');

btn.onclick = function () {
    let h1 = document.getElementsByTagName('h1')[0];
    h1.style.background = 'blue';
    fetch('http://localhost:8080/add?type=pro',{
        method:'post',
        credentials:'include',
        body:JSON.stringify({f:[100,200,300]}),
        /* headers:{
            "content-type":"application/json"
        } */
    }).then(data=>{
        return data.json();
    }).then(data=>{
        console.log(data);
    })
    $.post('http://localhost:8080/add?type=pro',{
        a:123,
        b:234,
        c:345    //jquery 的  post 发送给后端的 是 form-date形式 是 search字符串
    })
    $.post('http://localhost:8080/add?type=pro',{
        a1:123,
        b1:234,
        c1:345    //jquery 的  post 发送给后端的 是 form-date形式 是 search字符串
    })
    $.post('http://localhost:8080/add?type=pro',{
        a2:123,
        b2:234,
        c2:345    //jquery 的  post 发送给后端的 是 form-date形式 是 search字符串
    })

}
btn2.onclick = function () {
    fetch('http://localhost:8080/list?type=cookie').then(data=>{
        return data.json();
    }).then(data=>{
        console.log(data);
    })
}