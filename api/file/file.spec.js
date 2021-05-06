const request = require('supertest');
const should = require('should');
const fs = require('fs');
const path = require('path');
const app = require('../../');
const { sequelize, models } = require('../../models/');

describe('POST /api/file은', () => {
    const words = [
        {word: '알고리즘'},
        {word: '자료구조'},
        {word: '운영체제'},
        {word: '네트워크'},
        {word: '컴퓨터구조'}
    ];

    before(() => sequelize.sync({force: true}));
    before(() => models.Word.bulkCreate(words));

    describe('성공시', () => {
        it('파일 객체를 반환한다', (done) => {
            request(app)
                .post('/api/file')
                .set('Content-Type', 'multipart/form-data')
                .attach('file', path.join(__dirname, 'test.jpg'))
                .attach('age', 43200000)
                .expect(201)
                .end((err, res) => {
                    res.body.should.have.properties([
                        'word1',
                        'word2',
                        'word3',
                        'originalFileName',
                        'size',
                        'mimeType',
                        'key',
                        'location',
                        'createdAt',
                        'expiredAt',
                    ]);
                    done();
                });
        });
    });

    describe('실패시', () => {
        it('파일을 업로드하지 않으면 400을 응답한다', (done) => {
            request(app)
                .post('/api/file')
                .set('Content-Type', 'multipart/form-data boundary=---&')
                .attach('file', '')
                .expect(400)
                .end(done);
        });

        it('age 파라미터의 값이 허용되지 않은 값인 경우 400을 응답한다.', (done) => {
            request(app)
                .post('/api/file')
                .set('Content-Type', 'multipart/form-data')
                .attach('file', path.join(__dirname, '/test.jpg'))
                .attach('age', 999999999)
                .expect(400)
                .end(done);
        });

        it('업로드가 금지된 형식의 파일을 업로드하면 415을 응답한다', (done) => {
            request(app)
                .post('/api/file')
                .set('Content-Type', 'multipart/form-data')
                .attach('file', path.join(__dirname, 'test.php'))
                .expect(415)
                .end(done);
        });

        it('업로드한 파일의 사이즈가 5MB를 초과하면 400을 응답한다', (done) => {
            request(app)
                .post('/api/file')
                .set('Content-Type', 'multipart/form-data')
                .attach('file', path.join(__dirname, 'bigPicture.jpg'))
                .expect(400, {
                    type: 'MulterError',
                    message: 'File too large'
                }, done);
        });
    });
});

describe('GET /api/file/:year/:month/:date/:fileName 은', () => {
    const words = [
        {word: '알고리즘'},
        {word: '자료구조'},
        {word: '운영체제'},
        {word: '네트워크'},
        {word: '컴퓨터구조'}
    ];

    before(() => sequelize.sync({force: true}));
    before(() => models.Word.bulkCreate(words));

    const originalFileName = 'test.jpg';
    let threeWordsKey = {};

    before((done) => {
        request(app)
            .post('/api/file')
            .set('Content-Type', 'multipart/form-data')
            .attach('file', path.join(__dirname, originalFileName))
            .end((err, res) => {
                threeWordsKey.word1 = res.body.word1;
                threeWordsKey.word2 = res.body.word2;
                threeWordsKey.word3 = res.body.word3;

                done();
            });
    });

    let key;
    let cookie;

    before((done) => {
        request(app)
            .post('/api/downloadToken')
            .send(threeWordsKey)
            .end((err, res) => {
                cookie = res.header['set-cookie'][0].split(';')[0];
                key = res.body.key;
                done();
            });
    });

    describe('성공시', () => {
        it('원래 파일 이름이 ' + originalFileName + ' 인 파일을 반환한다.', (done) => {
            request(app)
                .get('/api/file/' + key)
                .set('cookie', cookie)
                .end((err, res) => {
                    res.header.should.have.properties({
                        'content-disposition': 'attachment; filename="' + originalFileName + '"',
                    });
                    done();
                });
        });
    });

    describe('실패시', () => {
        it('요청 헤더에 세션키가 설정되어 있지 않은 경우 401을 응답한다.', (done) =>{
            request(app)
                .get('/api/file/' + key)
                .expect(401)
                .end(done);
        });

        it('다운로드할 수 있도록 허가 받은 파일 이외에 다른 파일을 요청한 경우 403을 응답한다.', (done) => {
            request(app)
                .get('/api/file/2020/01/25/NOT_ALLOWED_FILE_NAME')
                .set('cookie', cookie)
                .expect(403)
                .end(done);
        });
    });
});