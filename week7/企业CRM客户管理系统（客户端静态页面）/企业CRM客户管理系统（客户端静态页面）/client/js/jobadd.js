$(function () {
    sessionStorage.setItem('currentUrl','./page/joblist.html');

    let $inp = $('input[type=text]'),
        $textA = $('textarea'),
        $submit = $('.submit'),
        $checks = $('input[name=job]');
    let id = location.href.queryURLParams().jobId;

    if (id) {
        // 编辑状态
        axios.get('/job/info?jobId='+id).then((data)=>{
            $inp.val(data.data.name);
            $textA.val(data.data.desc);
            let p = data.data.power;
            $checks.get().forEach(item=>{
                /* if (p.includes($(item).val())) {
                    item.checked = true
                } else {
                    item.checked = false;
                } */
                item.checked = p.includes(item.value);
            })
        })
    } 
    $submit.on('click', function () {
        let url = id ? '/job/update' : '/job/add';
        let obj = {};
        id ? obj.jobId = id : null;
        let name = $inp.val(),
            desc = $textA.val(),
        //     power = '';
        // $checks.get().forEach(item=>{
        //     if (item.checked) {
        //         power += item.value + '|'
        //     }
        // })
        // power = power.replace(/\|$/,'');
            power = $checks.get().filter(item=>item.checked).map(item=>item.value).join('|');
        if (!name) {
            alert('职务名称不能为空',{
                handled(){
                    $inp[0].focus();
                }
            });
            return
        }
        let options = {
            name,desc,power
        }
        axios.post(url,Object.assign(options,obj));
    })

})