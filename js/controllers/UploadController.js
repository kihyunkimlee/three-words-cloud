import UploadView from '../views/UploadView.js';
import UploadModalView from '../views/UploadModalView.js';
import UploadErrorModalView from '../views/UploadErrorModalView';
import UploadResultView from '../views/UploadResultView.js';

const tag = '[UploadController]';

export default {
    init(){
        UploadView.setup(document.querySelector('#uploadMain'))
            .on('@added', () => this.onAddedFile())
            .on('@uploaded', (e) => this.onUploadedFile(e.detail.res))
            .on('@serverError', (e) => this.onHandleServerError(e.detail.statusCode))
            .on('@uploadError', (e) => this.onHandleUploadError(e.detail.errMessage));
        
        UploadModalView.setup(document.querySelector('#uploadModal'))
            .on('@close', () => this.onCloseUploadModal())
            .on('@upload', (e) => this.onUploadFile(e.detail.selectedAge));

        UploadErrorModalView.setup(document.querySelector('#uploadErrorModal'))
            .on('@close', () => this.onCloseUploadErrorModal());

        UploadResultView.setup(document.querySelector('#uploadResult'))
            .on('@close', () => this.onCloseUploadResult());

        this.activeView = 'UploadView';
    },

    show(){
        if (this.activeView === 'UploadView'){
            UploadView.show();
        } else{
            UploadResultView.show();
        }
    },

    hide(){
        if (this.activeView === 'UploadView'){
            UploadView.hide();
        } else{
            UploadResultView.hide();
        }
    },

    onKeyUp(e){
        const escape = 27;
        if (e.keyCode !== escape) return;

        this.hideAllModal();
    },

    hideAllModal(){
        this.resetFile();
        UploadModalView.hide();
        UploadErrorModalView.hide();
    },

    onAddedFile(){
        UploadModalView.show();
    },

    resetFile(){
        UploadView.removeAddedFile();
    },

    onCloseUploadModal(){
        this.resetFile();
        UploadModalView.hide();
    },

    onUploadFile(selectedAge){
        UploadModalView.hide();
        UploadView.sendFile(selectedAge);
    },

    onCloseUploadErrorModal(){
        this.resetFile();
        UploadErrorModalView.hide();
    },

    onUploadedFile(res){
        this.activeView = 'UploadResultView';

        UploadResultView.render(res);
        UploadView.hide();
        UploadResultView.show();
    },

    onHandleServerError(statusCode){
        let errMessage;
        if (statusCode === 0){
            errMessage = 'The server is not responding.';
        } else if (statusCode === 400){
            errMessage = 'You must upload a file.';
        } else if (statusCode === 415){
            errMessage = 'This file format is forbidden!';
        } else if (statusCode === 503){
            errMessage = 'The server is temporarily unavailable.';
        } else{
            errMessage = 'An unexpected error has occurred!';
        }

        UploadErrorModalView.render(errMessage);
        UploadErrorModalView.show();
    },

    onHandleUploadError(errMessage){
        UploadErrorModalView.render(errMessage);
        UploadModalView.hide();
        UploadErrorModalView.show();
    },

    onCloseUploadResult(){
        this.activeView = 'UploadView';
        
        this.resetFile();
        UploadResultView.hide();
        UploadView.show();
    },
};