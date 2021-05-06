const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes, Op } = require('sequelize');

dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PW, DB_NAME } = process.env;

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PW,
    database: DB_NAME,
    logging: false,
});

const basename = path.basename(__filename);

const models = {};

fs.readdirSync(__dirname)
    .filter((fileName) => (
        fileName !== basename && fileName.slice(-3) === '.js'
    ))
    .forEach((fileName) => {
        const model = require(path.join(__dirname, fileName))(sequelize, DataTypes);
        models[model.name] = model;
    });

for(let modelName in models){
    if (models[modelName].associate){
        models[modelName].associate(models);
    }
}

module.exports = {
    sequelize,
    models,
    Op
};