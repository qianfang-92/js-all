var btn = document.getElementById('btn');

btn.onclick = function () {
    let h1 = document.getElementsByTagName('h1')[0];
    h1.style.background = 'blue';
    fetch('http://localhost:8001/add?type=pro',{
        method:'post',
        credentials:'include',
        body:JSON.stringify({a:[100,200,300]}),
        // headers:{
        //     "content-type":"application/json"
        // }
    }).then(data=>{
        return data.json();
    }).then(data=>{
        console.log(data);
    })
}
