import UploadView from '../views/UploadView.js';
import UploadModalView from '../views/UploadModalView.js';
import UploadErrorModalView from '../views/UploadErrorModalView';

const tag = '[UploadController]';

export default {
    init(){
        UploadView.setup(document.querySelector('#upload-main'))
            .on('@added', () => this.onAddedFile())
            .on('@uploaded', (e) => this.onUploadedFile(e.detail.res))
            .on('@serverError', (e) => this.onHandleServerError(e.detail.statusCode))
            .on('@uploadError', (e) => this.onHandleUploadError(e.detail.errMessage));
        
        UploadModalView.setup(document.querySelector('#upload-modal'))
            .on('@reset', () => this.onResetForm())
            .on('@upload', (e) => this.onUploadFile(e.detail.selectedAge));

        UploadErrorModalView.setup(document.querySelector('#upload-error-modal'))
            .on('@close', () => this.onResetForm());
    },

    show(){
        UploadView.show();
    },

    hide(){
        UploadView.hide();
    },

    onAddedFile(){
        console.log(tag, 'onAddedFile()');
        UploadModalView.show();
    },

    onResetForm(){
        console.log(tag, 'onResetForm()');
        UploadView.removeAddedFile();
    },

    onUploadFile(selectedAge){
        console.log(tag, 'onUploadFile()');
        UploadView.sendFile(selectedAge);
    },

    onUploadedFile(res){
        console.log(tag, 'onUploadedFile()');
    },

    onHandleServerError(statusCode){
        console.log(tag, 'onHandleServerError()');

        let errMessage;
        if (statusCode === 0){
            errMessage = 'The server is not responding.';
        } else if (statusCode === 400){
            errMessage = 'You must upload a file.';
        } else if (statusCode === 415){
            errMessage = 'This file format is forbidden!';
        } else if (statusCode == 503){
            errMessage = 'The server is temporarily unavailable.';
        } else{
            errMessage = 'An unexpected error has occurred!';
        }

        UploadErrorModalView.render(errMessage);
        UploadErrorModalView.show();
    },

    onHandleUploadError(errMessage){
        console.log(tag, 'onHandleUploadError()');
        UploadModalView.hide();

        UploadErrorModalView.render(errMessage);
        UploadErrorModalView.show();
    },
};