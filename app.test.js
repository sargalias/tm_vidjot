const request = require('supertest');
const app = require('./app');


test('app is a function', () => {
    expect(app).toBeTruthy();
});

describe('Route: /', () => {
    test('Should respond with statusCode 200 GET method', (done) => {
        request(app).get('/').then((res) => {
            expect(res.statusCode).toBe(200);
            done();
        })
    });
    test('Should not respond to DELETE method', (done) => {
        request(app).delete('/').then((res) => {
            expect(res.statusCode).toBe(404);
            done();
        });
    });
    test('Should not match the word error', (done) => {
        request(app).get('/').then((res) => {
            expect(res.text.toLowerCase()).not.toMatch('error');
            done();
        });
    });
});
