import View from './View.js';
import axios from 'axios';

const tag = '[DownloadView]';

const DownloadView = Object.create(View);

DownloadView.setup = function(el){
    this.init(el);
    this.formEl = el.querySelector('#downloadMainForm');
    this.buttonEl = el.querySelector('#downloadMainButton');
    this.messageEl = el.querySelector('#downloadMainAlert');

    this.bindEvents();

    return this;
};

DownloadView.bindEvents = function(){
    this.buttonEl.addEventListener('click', () => this.onClickDownload());

    Array.from(this.formEl.querySelectorAll('input')).forEach((input) => {
        input.addEventListener('focus', (e) => this.onFocus(e));
        input.addEventListener('focusout', (e) => this.onFocusOut(e));
        input.addEventListener('keyup', (e) => this.onKeyUP(e));
    });
};

DownloadView.onClickDownload = function(){
    if (this.checkFormValidation()){
        this.emit('@auth', {threeWordsKey: this.getThreeWordsKey()});
    } else{
        this.markInvalidInputs();
        this.renderMessage('Fill in all the blanks');
    }
};

DownloadView.checkFormValidation = function(){
    return Array.from(this.formEl.querySelectorAll('input')).every(this.checkInputValidation);
};

DownloadView.checkInputValidation = function(input){
    return input.value.length;
};

DownloadView.getThreeWordsKey = function(){
    return Array.from(this.formEl.querySelectorAll('input')).reduce((threeWordsKey, input) => {
        threeWordsKey[input.name] = input.value;

        return threeWordsKey;
    }, {});
};

DownloadView.markInvalidInputs = function(){
    Array.from(this.formEl.querySelectorAll('input')).forEach((input) => {
        if (!this.checkInputValidation(input)){
            this.markInputInvalid(input);
        }
    });
};

DownloadView.markInputInvalid = function(input){
    input.className = 'invalid';
};

DownloadView.markInputValid = function(input){
    input.className = '';
};

DownloadView.onFocus = function(e){
    e.target.style = 'border-bottom: 2.25px solid #2ac187';

    e.target.select();
};

DownloadView.onFocusOut = function(e){
    e.target.style = '';
};

DownloadView.onKeyUP = function(e){
    if (this.checkInputValidation(e.target)){
        this.markInputValid(e.target);

        this.hideMessage();
    }
};

DownloadView.renderMessage = function(message){
    this.messageEl.querySelector('#downloadMainAlertcontent').innerHTML = message;

    this.showMessage();
}

DownloadView.showMessage = function(){
    this.messageEl.style.display = '';
};

DownloadView.hideMessage = function(){
    this.messageEl.style.display = 'none';
}

DownloadView.resetForm = function(){
    Array.from(this.formEl.querySelector('input')).forEach(this.resetInput);
};

DownloadView.resetInput = function(input){
    input.value = '';
    input.className = '';
}

export default DownloadView;