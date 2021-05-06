import View from './View.js';

const tag = '[TabView]';

const TabView = Object.create(View);

TabView.setup = function(el){
    this.init(el);
    this.bindClickEvent();

    return this;
};

TabView.bindClickEvent = function(){
    Array.from(this.el.children).forEach((li) => {
        li.addEventListener("click", (e) => this.onClick(li.innerHTML));
    });
};

TabView.onClick = function(tabName){
    this.setActiveTab(tabName);
    this.emit('@change', { tabName });
};

TabView.setActiveTab = function(tabName){
    Array.from(this.el.children).forEach((li) => {
        li.className = li.innerHTML === tabName ? 'active' : '';
    });
};

export default TabView;