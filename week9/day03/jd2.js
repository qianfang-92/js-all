Vue.filter('money', function(val) {
    return "￥"+(val/100).toFixed(2)
})

let vm = new Vue({
    el:'#app',
    data:{
        name:'珠峰',
        datalist:[],
        show:false,
        delIndex:''
    },
    computed:{
        checkAll:{
            // checkAll 依赖下边的每一项的 isSelected
            get(){
                return this.datalist.every(item=>item.isSelect)
            },
            set(val){
                this.datalist.forEach(item=>{
                    item.isSelect = val;
                })
            }
        },
        total(){
            // total依赖于 
            return this.datalist.filter(item=>item.isSelect).reduce((prev,next)=>{
                return prev+next.price*next.count
            },0)
        }
    },
    created(){
        // 当前实例创造完成之后触发该函数  this 是当前实例    钩子函数
        this.getData()
    },
    methods:{
        getData(){
            fetch('http://127.0.0.1:8081/jd/list').then(Response=>Response.json()).then(data=>{
                console.log(data);
                this.datalist = data.data;
                // 重置checkAll属性
                this.checkAll = this.datalist.every(item=>item.isSelect);
            }).catch(err=>{
                console.log(err)
            })
        },
        delFn(n){
            this.delIndex = n;
            this.show = true;
        },
        checkOneFn(obj){
            // obj是选择的那一条数据
            fetch('http://127.0.0.1:8081/jd/isSelect',{
                method:'post',
                body:JSON.stringify({id:obj.id,isSelect:obj.isSelect})
            }).then(data=>{
                return data.json();
            }).then(data=>{
                console.log(data);
                if(data.code == 0) {
                    // this.checkAll = this.datalist.every(item=>item.isSelect);
                }
            })
        },
        clear(){
            this.datalist = [];
        },
        cancel(){
            this.show = false;
        },
        sure(){
            this.show = false;
            this.datalist.splice(this.delIndex,1);
            this.checkOneFn();
        }
    }
})
