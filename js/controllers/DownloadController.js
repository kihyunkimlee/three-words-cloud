import DownloadView from '../views/DownloadView.js';

import FileModel from '../models/FileModel.js';

const tag = '[DownloadController]';

export default {
    init(){
        DownloadView.setup(document.querySelector('#downloadMain'))
            .on('@auth', (e) => this.onAuthThreeWordsKey(e.detail.threeWordsKey));

        this.activeView = 'DownloadView';
    },

    show(){
        if (this.activeView === 'DownloadView'){
            DownloadView.show();
        } else{

        }
    },

    hide(){
        if (this.activeView === 'DownloadView'){
            DownloadView.hide();
        } else{

        }
    },

    onAuthThreeWordsKey(threeWordsKey){
        FileModel.auth(threeWordsKey)
            .then((res) => {
                console.log(res.data);
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
    }
};