const rewire = require("rewire");
const request = require("supertest");

const app = rewire('../index.js');
describe('Testing /calculate route', () => {

    it('POST empty body is 200', (done) => {
        request(app)
            .post('/calculate')
            .send()
            .expect(200)
            .end((err, _) => {
                done(err);
            });
    });

});