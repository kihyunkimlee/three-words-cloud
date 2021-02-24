import View from './View.js';

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

    const d = new Date(res.expiredAt);
    this.expiredDateEl.innerHTML = this.date2Str(d);
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

UploadResultView.date2Str = function(d){
    const yyyy = d.getFullYear();
    const MM = this.makeTwoDigitNum(d.getMonth() + 1);
    const dd = this.makeTwoDigitNum(d.getDate());
    const hh = this.makeTwoDigitNum(d.getHours());
    const mm = this.makeTwoDigitNum(d.getMinutes());
    const ss = this.makeTwoDigitNum(d.getSeconds());

    return yyyy + '/' + MM + '/' + dd + ' ' + hh + ':' + mm + ':' + ss;
};

UploadResultView.makeTwoDigitNum = function(num){
    return ('0' + num).slice(-2);
};

export default UploadResultView;