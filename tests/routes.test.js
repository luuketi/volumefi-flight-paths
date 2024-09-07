const rewire = require("rewire");
const request = require("supertest");
const expect = require("chai").expect;

const app = rewire('../index.js');
describe('Testing /calculate route', () => {

    it('POST empty body is 400', (done) => {
        request(app)
            .post('/calculate')
            .send()
            .expect(400)
            .end((err, response) => {
                const errors = response.body.errors;
                expect(errors.length).to.equal(1);
                expect(errors[0].msg).to.eq('Array of flights is required');
                done(err);
            });
    });

});