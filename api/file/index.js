const express = require('express');
const router = express.Router();
const ctrl = require('./file.ctrl');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../../s3');
const dotenv = require('dotenv');
const { getRandomKey } = require('../../utils');
const { handleMulterError, handleDBError } = require('../../middleware/errorHandler');

if (process.env.NODE_ENV === 'test'){
    dotenv.config();
}

const storage = multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'private',
    key: getRandomKey,
    contentDisposition: 'attachment',
});

const fileFilter = (req, file, cb) => {
    const re = /.asp|.aspx|.php|.jsp|.pl|.html/;

    const fileName = file.originalname.toLowerCase();

    if (re.test(fileName)){
        req.fileFormatError = true;
        
        cb(null, false);
    } else{
        cb(null, true);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5*1024*1024 },
});

router.post('', upload.single('file'), ctrl.createFile);
router.get('/:year/:month/:date/:fileName', ctrl.getFile);

router.use(handleDBError);
router.use(handleMulterError);

module.exports = router;