const { models } = require('../models');
const words = require('../words');

module.exports = () => {
    console.log('initializing database...');

    return new Promise((resolve, reject) => {
        models.Word.bulkCreate(words.map((word) => ({word})))
            .then(resolve)
            .catch(reject);
    });
};