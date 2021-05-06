const app = require('../index');
const syncDB = require('./syncDB');
const initDB = require('./initDB');
const tic = require('./tic');
const syncS3 = require('./syncS3');

syncDB()
    .then(initDB)
    .then(syncS3)
    .then(tic)
    .then(() => {
        app.listen(5000, () => {
            console.log('server is running on ' + 5000 + ' port!');
        });
    });