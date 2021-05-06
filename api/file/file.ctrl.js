const { sequelize, models, Op } = require('../../models/');
const path = require('path');
const s3 = require('../../s3');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'test'){
    dotenv.config();
}

const createthreeWordsKey = async () => {
    const { count, rows } = await models.Word.findAndCountAll({
        attributes: [ 'word', ],
        order: sequelize.random(),
    });

    let cnt = 0;
    while(cnt <= 100){
        const threeWords = [];

        for(let i = 0; i < 3; i++){
            const randNum = Math.floor(Math.random() * count);

            threeWords.push(rows[randNum].word);
        }

        const exist = await models.File.count({
            where: {
                [Op.and]: [
                    { word1: threeWords[0] },
                    { word2: threeWords[1] },
                    { word3: threeWords[2] }
                ]
            }
        });

        if (exist){
            cnt += 1;

            continue;
        }else {
            return threeWords;
        }
    }

    return [-1, -1, -1];
};

const createFile = async (req, res, next) => {
    const listOfMaxAges = [
        30000,    //30 seconds for test
        10800000, //3 hours
        43200000, //12 hours
        86400000, //24 hours
    ];

    let age = parseInt(req.body.age, 10);
    if (Number.isNaN(age)){
        age = 10800000;
    } else if (listOfMaxAges.every((maxAge) => (age !== maxAge))){
        return res.status(400).end();
    }

    if (!req.file){
        if (req.fileFormatError){
            return res.status(415).end();
        } else {
            return res.status(400).end();
        }
    }

    const threeWordsKey = await createthreeWordsKey();
    
    if (threeWordsKey[0] === -1){
        console.log('exceed the maximum number of try to make a new threeWordskey!');

        return res.status(503).end();
    }

    const { originalname, size, mimetype, key, location } = req.file;

    const now = Date.now();

    models.File.create({
        word1: threeWordsKey[0],
        word2: threeWordsKey[1],
        word3: threeWordsKey[2],
        originalFileName: originalname,
        size: size,
        mimeType: mimetype,
        key: key,
        location: location,
        createdAt: now,
        expiredAt: now + age,
    }).then((file) => {
        return res.status(201).json(file);
    }).catch(next);

};

const getFile = (req, res, next) => {
    const { word1, word2, word3 } = req.session;
    if (!word1 || !word2 || !word3){
        return res.status(401).end();
    }

    const { year, month, date, fileName } = req.params;

    const key = path.join(year, month, date, fileName);

    models.File.findOne({
        where: {
            [Op.and] : [
                {word1: word1},
                {word2: word2},
                {word3: word3},
            ]
        }
    }).then((file) => {
        if (!file) return res.status(410).end();
        
        if (file.key !== key){
            return res.status(403).end();
        }

        res.attachment(file.originalFileName);
        res.setHeader('Content-type', file.mimeType);

        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: file.key,
        };

        const filestream = s3.getObject(params).createReadStream();

        filestream.pipe(res);
    }).catch(next);

};

module.exports = {
    createFile,
    getFile,
};