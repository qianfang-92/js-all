class Tab {
    constructor (idSelector) {
        this.box = document.querySelector(idSelector);
        this.tabs = this.box.querySelectorAll('.tab');
        this.bodys = this.box.querySelectorAll('.body');
        this.mapBind();
    }
    mapBind () {
        for (let i = 0; i < this.tabs.length; i++) {
            this.tabs[i].onclick = () => {
            this.clearClass();
            this.tabs[i].className = 'tab current';
            this.bodys[i].className = 'body current';
            }
        }
    }
    clearClass () {
        for (var i = 0; i < this.tabs.length; i++) {
            this.tabs[i].className = 'tab';
            this.bodys[i].className = 'body';
        }
    }

}