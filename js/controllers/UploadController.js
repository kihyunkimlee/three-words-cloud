import UploadView from '../views/UploadView.js';

const tag = '[UploadController]';

export default {
    init(){
        UploadView.setup(document.querySelector('#upload-main'))
            .on('@added', () => this.onAddedFile())
            .on('@uploaded', (e) => this.onUploadedFile(e.detail.res));
    },

    show(){
        UploadView.show();
    },

    hide(){
        UploadView.hide();
    },

    onAddedFile(){
        console.log(tag, 'onAddedFile()');
    },

    onUploadedFile(res){
        console.log(tag, 'onUploadedFile()');
    },
};