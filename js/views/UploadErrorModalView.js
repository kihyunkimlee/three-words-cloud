import View from './View.js';

const tag = '[UploadErrorModalView]';

const UploadErrorModalView = Object.create(View);

UploadErrorModalView.setup = function(el){
    this.init(el);
    this.messageEl = el.querySelector('#error-message');
    this.buttonEl = el.querySelector('#close-button');

    this.bindEvents();

    return this;
}

UploadErrorModalView.render = function(errMessage){
    this.messageEl.innerHTML = errMessage;
}

UploadErrorModalView.show = function(el){
    this.el.style.display = 'block';
}

UploadErrorModalView.bindEvents = function(){
    this.el.addEventListener('click', (e) => this.onClickClose(e));
    this.buttonEl.addEventListener('click', (e) => this.onClickCloseBtn(e));
};

UploadErrorModalView.onClickClose = function(e){
    if (e.target !== this.el) return;

    this.emit('@close');
    
    this.hide();
};

UploadErrorModalView.onClickCloseBtn = function(e){
    this.emit('@close');
    
    this.hide();
};

export default UploadErrorModalView;