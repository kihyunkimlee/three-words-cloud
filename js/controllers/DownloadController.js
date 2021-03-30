import DownloadView from '../views/DownloadView.js';
import DownloadResultView from '../views/DownloadResultView.js';

import FileModel from '../models/FileModel.js';

const tag = '[DownloadController]';

export default {
    init(){
        DownloadView.setup(document.querySelector('#downloadMain'))
            .on('@auth', (e) => this.onAuthThreeWordsKey(e.detail.threeWordsKey));

        DownloadResultView.setup(document.querySelector('#downloadResult'))
            .on('@close', () => this.onCloseDownloadResult());

        this.activeView = 'DownloadView';
    },

    show(){
        if (this.activeView === 'DownloadView'){
            DownloadView.show();
        } else{
            DownloadResultView.show();
        }
    },

    hide(){
        if (this.activeView === 'DownloadView'){
            DownloadView.hide();
        } else{
            DownloadResultView.hide();
        }
    },

    onAuthThreeWordsKey(threeWordsKey){
        FileModel.auth(threeWordsKey)
            .then((res) => {
                this.activeView = 'DownloadResultView';

                DownloadResultView.render(res.data);
                DownloadView.hide();
                DownloadResultView.show();
            })
            .catch(this.handleAuthError);
    },

    handleAuthError(err){
        if (err.response.status === 400){
            DownloadView.renderMessage('Bad request!');
        } else if (err.response.status === 404){
            DownloadView.renderMessage('The keys are invalid');
        } else if (err.response.status === 410){
            DownloadView.renderMessage('The file has expired');
        } else if (err.request){
            DownloadView.renderMessage('The server is not responding');
        } else{
            DownloadView.renderMessage('An unexpected error has occurred!');
        }
    },

    onCloseDownloadResult(){
        this.activeView = 'DownloadView';

        this.resetForm();
        DownloadResultView.hide();
        DownloadView.show();
    },

    resetForm(){
        DownloadView.resetForm();
    },
};