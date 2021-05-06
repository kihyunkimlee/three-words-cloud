const { MulterError } = require('multer');
const { DatabaseError } = require('sequelize');

module.exports.handleMulterError = (err, req, res, next) => {
    if (err instanceof MulterError){
        res.status(400).json({
            type: 'MulterError',
            message: err.message,
        });
    } else {
        next(err);
    }
};

module.exports.handleDBError = (err, req, res, next) => {
    if (err instanceof DatabaseError){
        console.log(err.message);

        res.status(500).json({
            type: 'DatabaseError',
        })
    } else{
        next(err);
    }
};