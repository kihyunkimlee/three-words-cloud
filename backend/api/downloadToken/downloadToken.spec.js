const request = require('supertest');
const should = require('should');
const app = require('../../');
const path = require('path');
const { sequelize, models } = require('../../models/');

describe('POST /api/downloadToken은 ', () => {
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
            .attach('file', path.join(__dirname, '/', originalFileName))
            .end((err, res) => {
                threeWordsKey.word1 = res.body.word1;
                threeWordsKey.word2 = res.body.word2;
                threeWordsKey.word3 = res.body.word3;

                done();
            });
    });

    describe('성공시', () => {
        it('원래 파일 이름이 ' + originalFileName + ' 인 파일 객체를 반환한다. ', (done) => {
            request(app)
                .post('/api/downloadToken')
                .send(threeWordsKey)
                .end((err, res) => {
                    res.body.should.have.property('originalFileName', originalFileName);
                    res.body.should.have.properties([
                        'word1',
                        'word2',
                        'word3',
                        'originalFileName',
                        'size',
                        'mimeType',
                        'key',
                        'location',
                        'createdAt'
                    ]);

                    done();
                });
        });

        it('세션 키를 발급한다.', (done) => {
            request(app)
                .post('/api/downloadToken')
                .send(threeWordsKey)
                .end((err, res) => {
                    res.header.should.have.property('set-cookie');
                    
                    done();
                });
        });
    });

    describe('실패시', () => {
        it('세글자 키를 전송하지 않은 경우 400을 응답한다.', (done) => {
            request(app)
                .post('/api/downloadToken')
                .expect(400)
                .end(done);
        });

        it('세글자 키 중에서 일부라도 전송하지 않은 경우 400을 응답한다.', (done) => {
            request(app)
                .post('/api/downloadToken')
                .send({
                    word1: 'NO',
                    word2: 'word3'
                }).expect(400)
                .end(done);
        });

        it('세글자 키가 유효하지 않은 경우 404를 응답한다.', (done) => {
            request(app)
                .post('/api/downloadToken')
                .send({
                    word1: 'NOT',
                    word2: 'AVAILABLE',
                    word3: 'KEY'
                }).expect(404)
                .end(done);
        });
    });
});