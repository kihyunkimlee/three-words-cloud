import View from './View.js';
import Dropzone from 'dropzone';

const tag = '[UploadView]';

const UploadView = Object.create(View);

UploadView.setup = function(el){
    this.init(el);
    this.formEl = el.querySelector('form');
    this.hiddenEl = el.querySelector('form [type="hidden"]');
    this.buttonEl = el.querySelector('form [type="button"]');
    this.previewEl = el.querySelector('form .preview');

    this.maxFileSize = 3;

    this.createDropzone();
    this.addDropzoneEvents();

    return this;
};

UploadView.createDropzone = function(){
    const previewTemplate = this.getAndRemovePreviewTemplate();

    Dropzone.autoDiscover = false;
    
    this.dropzone = new Dropzone(this.formEl, {
        url: 'http://localhost:3000/file',
        method: 'post',
        parallelUploads: 1,
        maxFilesize: this.maxFileSize,
        filesizeBase: 1000,
        paramName: 'file',
        createImageThumbnails: true,
        thumbnailWidth: 90,
        thumbnailHeight: 90,
        autoProcessQueue: false,
        previewTemplate: previewTemplate,
        previewsContainer: this.previewEl,
    });
};

UploadView.getAndRemovePreviewTemplate = function(){
    const previewTemplate = this.previewEl.innerHTML;
    this.previewEl.removeChild(this.previewEl.querySelector('#preview-template'));

    return previewTemplate;
};

UploadView.addDropzoneEvents = function(){
    this.dropzone.on('addedfile', (file) => {
        this.showButton(false);
        this.showPreview(true);

        this.emit('@added');
    });
    this.dropzone.on('success', (file, res) => {
        this.emit('@uploaded', {res});
    });
};

UploadView.showButton = function(show = true){
    this.buttonEl.style.display = show ? 'block' : 'none';
};

UploadView.showPreview = function(show = true){
    this.previewEl.style.display = show ? 'block' : 'none';
}

UploadView.removeAddedFile = function(){
    this.dropzone.removeAllFiles();

    this.showButton(true);
    this.showPreview(false);
};

UploadView.sendFile = function(selectedAge){
    this.hiddenEl.value = selectedAge;

    this.dropzone.processQueue();
}

export default UploadView;