import View from './View.js';
import { date2Str } from '../utils';

const tag = '[UploadResultView]';

const UploadResultView = Object.create(View);

UploadResultView.setup = function(el){
    this.init(el);
    this.keyContainerEl = el.querySelector('#keyContainer');
    this.buttonEl = el.querySelector('#uploadResultCloseButton');
    this.expiredDateEl = el.querySelector('#uploadResultExpiredDate');

    this.bindClickEvent();

    return this;
};

UploadResultView.bindClickEvent = function(){
    this.buttonEl.addEventListener('click', () => this.onClickCloseBtn());
};

UploadResultView.onClickCloseBtn = function(){
    this.emit('@close');
};

UploadResultView.render = function(res){
    const words = {
        'first word': res.word1,
        'second word': res.word2,
        'third word': res.word3
    };
    this.keyContainerEl.innerHTML = this.getWordKeyHtml(words);

    this.expiredDateEl.innerHTML = date2Str(new Date(res.expiredAt));
};

UploadResultView.getWordKeyHtml = function(words){
    let html = '';

    for(const prop in words){
        html += `<div class="key">
            <div class="key-name">${prop}</div>
            <div class="key-value">${words[prop]}</div>
        </div>`;
    }

    return html;
};

export default UploadResultView;