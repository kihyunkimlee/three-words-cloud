const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');
const MySqlStore = require('express-mysql-session')(session);
const cors = require('cors');
const file = require('./api/file/');
const downloadToken = require('./api/downloadToken');

if (process.env.NODE_ENV !== 'test'){
    app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'test'){
    dotenv.config();
}

const sessionStore = new MySqlStore({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.SESSION_DB_NAME,
});

app.use(session({
    secret: 'threeWordsCloudSecretKey',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000,
        secure: false,
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: true,
    credentials: true,
}));

app.use('/api/file', file);
app.use('/api/downloadToken', downloadToken);

module.exports = app;