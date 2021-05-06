const s3 = require('../s3');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'test'){
    dotenv.config();
}

const getListBuckets = () => {
    return new Promise((resolve, reject) => {
        s3.listBuckets((err, data) => {
            if (err){
                console.log('fail to get a list of buckets!');
                reject();
            } else{
                resolve(data.Buckets);
            }
        });
    });
};

const checkBucketExist = (Buckets) => {
    const existed = Buckets.some((bucket) => {
        if (bucket.Name === process.env.AWS_S3_BUCKET_NAME) return true;
    });

    return Promise.resolve(existed);
};

const createBucket = () => {
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        CreateBucketConfiguration: {
            LocationConstraint: 'ap-northest-2'
        },
    };

    return new Promise((resolve, reject) => {
        s3.createBucket(params, (err, data) => {
            if (err){
                console.log('fail to create a new bucket!');
                reject();
            } else{
                resolve();
            }
        });
    });
};

const getListObjects = () => {
    const params = {
        Bucket : process.env.AWS_S3_BUCKET_NAME,
        MaxKeys: 100000000,
    };

    return new Promise((resolve, reject) => {
        s3.listObjectsV2(params, (err, data) => {
            if (err){
                console.log('fail to get a list of objects!');
                reject();
            } else{
                resolve(data.Contents);
            }
        });
    });
};

const deleteListObjects = (Contents) => {
    const Objects = Contents.map((Content) => {
        return { Key: Content.Key }
    });

    if (Objects.length === 0){
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Delete: {
                Objects,
            },
        };

        s3.deleteObjects(params, (err, data) => {
            if (err){
                console.log(err, 'fail to delete a list of objects!');
                reject();
            } else{
                resolve();
            }
        });
    });
};

module.exports = () => {
    console.log('synchronizing S3....');

    return new Promise((resolve, reject) => {
        getListBuckets()
            .then(checkBucketExist)
            .then((existed) => {
                if (!existed){
                    createBucket()
                        .then(resolve)
                        .catch(reject);
                } else{
                    getListObjects()
                        .then(deleteListObjects)
                        .then(resolve)
                        .catch(reject);
                }
            })
            .catch(reject);
    });
};