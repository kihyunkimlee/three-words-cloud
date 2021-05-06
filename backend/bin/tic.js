const cron = require('node-cron');
const s3 = require('../s3');
const dotenv = require('dotenv');
const { models, Op } = require('../models');

if (process.env.NODE_ENV === 'test'){
    dotenv.config();
}

const deleteObjects = (Objects) => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Delete: { Objects },
    };

    return new Promise((resolve, reject) => {
        s3.deleteObjects(params, (err, data) => {
            if (err){
                console.log('fail to delete objects!');
                reject(err);
            } else{
                console.log('expired objects deleted successfully!');
                resolve();
            }
        });
    });
};

module.exports = () => {
    console.log('tic... tok...');

    cron.schedule('0 0 3 * * *', async function (){
        console.log('start removing expired files...');

        const files = await models.File.findAll({
            attributes: [
                'id',
                'key',
                'expiredAt',
            ]
        });

        if (!files){
            console.log('there\'s no uploaded file');
            return;
        }

        const now = Date.now();

        const ids = [];
        const Objects = [];

        files.forEach((file) => {
            if (file.expiredAt - now < 0){
                ids.push(file.id);
                Objects.push({ Key: file.key });
            }
        });

        if (ids.length === 0){
            console.log('there\'s no expired file');
            return;
        }

        deleteObjects(Objects)
        .then(models.File.destroy({
            where: {
                id: {
                    [Op.in]: ids,
                }
            }
        })).catch((err) => {
            console.log(err.message);
        });
    });

    return Promise.resolve();
};