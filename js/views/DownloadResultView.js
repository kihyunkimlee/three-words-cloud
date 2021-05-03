import View from './View.js';
import { abbreviateStr, num2FileUnits, date2Str } from '../utils';
import config from '../config';

const tag = '[DownloadResultView]';

const DownloadResultView = Object.create(View);

DownloadResultView.setup = function(el){
    this.init(el);
    this.fileIconEl = el.querySelector('#downloadResultFileIcon');
    this.fileNameEl = el.querySelector('#downloadResultFileName');
    this.fileSizeEl = el.querySelector('#downloadResultFileSize');
    this.fileUploadDateEl = el.querySelector('#downloadResultFileUploadeDate');
    this.fileExpireDateEl = el.querySelector('#downloadResultFileExpireDate');
    this.downloadButtonEl = el.querySelector('#downloadResultButton');
    this.closeButtonEl = el.querySelector('#downloadResultCloseButton');

    this.bindEvent();
    
    return this;
};

DownloadResultView.bindEvent = function(){
    this.closeButtonEl.addEventListener('click', () => this.onClickCloseBtn());
};

DownloadResultView.onClickCloseBtn = function(){
    this.emit('@close');
};

DownloadResultView.render = function(res){
    this.fileIconEl.innerHTML = this.getFileIconHtml(res.mimeType);
    this.fileNameEl.innerHTML = abbreviateStr(res.originalFileName.normalize(), 18);
    this.fileSizeEl.innerHTML = num2FileUnits(parseInt(res.size));
    this.fileUploadDateEl.innerHTML = date2Str(new Date(res.createdAt));
    this.fileExpireDateEl.innerHTML = date2Str(new Date(res.expiredAt));
    this.downloadButtonEl.href = config.serverDomain + '/file/' + res.key;
}

DownloadResultView.getFileIconHtml = function(mimeType){
    const format = mimeType.split('/')[1];

    return `<img src="images/formats/${format}.png" onerror="this.src='images/formats/default.png'">`;
}

export default DownloadResultView;