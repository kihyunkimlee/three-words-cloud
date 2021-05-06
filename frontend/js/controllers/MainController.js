import TabView from '../views/TabView.js';

import UploadController from './UploadController.js';
import DownloadController from './DownloadController.js';

const tag = '[MainController]';

export default {
    init(){
        document.addEventListener('keyup', e => this.onKeyUp(e));

        TabView.setup(document.querySelector('#tabs'))
            .on('@change', e => this.onChangeTab(e.detail.tabName));
        
        UploadController.init();
        DownloadController.init();

        this.selectedTab = 'UPLOAD';
        this.renderView();
    },

    renderView(){
        console.log(tag, 'renderView()');
        TabView.setActiveTab(this.selectedTab);

        if (this.selectedTab === 'UPLOAD'){
            UploadController.show();
            DownloadController.hide();
        } else{
            DownloadController.show();
            UploadController.hide();
        }
    },

    onChangeTab(tabName){
        if (this.selectedTab === tabName) return;
        
        this.selectedTab = tabName;
        this.renderView();
    },

    onKeyUp(e){
        if (this.selectedTab === 'UPLOAD'){
            UploadController.onKeyUp(e);
        } else{
            DownloadController.onKeyUp(e);
        }
    },
};