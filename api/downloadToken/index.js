const express = require('express');
const router = express.Router();
const ctrl = require('./downloadToken.ctrl');
const { handleDBError } = require('../../middleware/errorHandler');

router.post('', ctrl.getDownloadToken);

router.use(handleDBError);

module.exports = router;