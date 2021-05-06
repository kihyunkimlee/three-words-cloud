const { models, Op } = require('../../models/');

const getDownloadToken = (req, res, next) => {
    const { word1, word2, word3 } = req.body;

    if (!word1 || !word2 || !word3){
        return res.status(400).end();
    }

    models.File.findOne({
        where: {
            [Op.and]: [
                {word1: word1},
                {word2: word2},
                {word3: word3}
            ]
        }
    }).then((file) => {
        if (!file) return res.status(404).end();

        if (file.expiredAt - Date.now() <= 0) return res.status(410).end();
        
        req.session.word1 = word1;
        req.session.word2 = word2;
        req.session.word3 = word3;

        return res.json(file);
    }).catch(next);
};

module.exports = {
    getDownloadToken,
};