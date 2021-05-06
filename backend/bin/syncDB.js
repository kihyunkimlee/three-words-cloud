const { sequelize } = require('../models');

module.exports = () => {
    console.log('synchronzing database...');

    const options = {
        force: true,
    };

    return sequelize.sync(options);
};