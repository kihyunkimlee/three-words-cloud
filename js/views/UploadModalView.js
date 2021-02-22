import View from './View.js';

const tag = '[UploadModalView]';

const UploadModalView = Object.create(View);

UploadModalView.setup = function(el){
    this.init(el);
    this.selectEl = el.querySelector('#age-select');
    this.buttonEl = el.querySelector('#upload-button');

    this.bindEvents();

    return this;
};

UploadModalView.show = function(){
    this.el.style.display = 'block';
};

UploadModalView.hide = function(){
    this.el.style.display = 'none';

    this.resetModal();
}

UploadModalView.bindEvents = function(){
    this.el.addEventListener('click', (e) => this.onClickClose(e));
    this.buttonEl.addEventListener('click', () => this.onClickUpload());
};

UploadModalView.onClickClose = function(e){
    if (e.target !== this.el) return;

    this.emit('@close');
};

UploadModalView.onClickUpload = function(){
    const selectedAge = this.selectEl.options[this.selectEl.selectedIndex].value;

    this.emit('@upload', {selectedAge});
};

UploadModalView.resetModal = function(){
    this.selectEl.options[1].selected = true;
};

export default UploadModalView;