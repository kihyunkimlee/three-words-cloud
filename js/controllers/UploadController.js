import UploadView from '../views/UploadView.js';
import UploadModalView from '../views/UploadModalView.js';

const tag = '[UploadController]';

export default {
    init(){
        UploadView.setup(document.querySelector('#upload-main'))
            .on('@added', () => this.onAddedFile())
            .on('@uploaded', (e) => this.onUploadedFile(e.detail.res));
        
        UploadModalView.setup(document.querySelector('#upload-modal'))
            .on('@reset', () => this.onResetForm())
            .on('@upload', (e) => this.onUploadFile(e.detail.selectedAge));
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
};