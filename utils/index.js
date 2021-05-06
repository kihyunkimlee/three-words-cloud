const crypto = require('crypto');

module.exports.getRandomKey = (req, file, cb) => {
    const d = new Date();

    crypto.randomBytes(32, (err, buf) => {
        if (err){
            cb(err, undefined);
        } else{
            const key = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + '/' + buf.toString('hex');
            
            cb(null, key);
        }
    });
};