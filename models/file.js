module.exports = (sequelize, DataTypes) => {
    const file = sequelize.define('File', {
        id: {
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        word1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        word2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        word3: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(64),
            allowNull: true,
        },
        originalFileName: {
            //On Windows, Linux, Solaris, and Mac os X, the maximum number of characters for a file name is 255Bytes.
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mimeType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false, 
        },
        expiredAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
    });

    file.associate = function (models) {

    };
    
    return file;
};