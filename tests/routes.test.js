const rewire = require("rewire");
const request = require("supertest");
const expect = require("chai").expect;

const app = rewire('../index.js');
describe('Testing /calculate route', () => {

    it('POST empty body is 400 Bad Request', (done) => {
        request(app)
            .post('/calculate')
            .send()
            .expect(400)
            .end((err, response) => {
                const errors = response.body.errors;
                expect(4).to.equal(errors.length);
                expect('List of flights is required').to.eq(errors[0].msg);
                expect('List of flights can\'t be empty').to.eq(errors[1].msg);
                expect('Flight must have two elements').to.eq(errors[2].msg);
                expect('Flight departure and arrivals must be string').to.eq(errors[3].msg);
                done(err);
            });
    });

    it('POST empty list is 400 Bad Request', (done) => {
        request(app)
            .post('/calculate')
            .send([])
            .expect(400)
            .end((err, response) => {
                const errors = response.body.errors;
                expect(1).to.equal(errors.length);
                expect('List of flights can\'t be empty').to.eq(errors[0].msg);
                done(err);
            });
    });

    it('POST list of empty list is 400 Bad Request', (done) => {
        request(app)
            .post('/calculate')
            .send([[]])
            .expect(400)
            .end((err, response) => {
                const errors = response.body.errors;
                expect(1).to.equal(errors.length);
                expect('Flight must have two elements').to.eq(errors[0].msg);
                done(err);
            });
    });

    it('POST list of list of int is 400 Bad Request', (done) => {
        request(app)
            .post('/calculate')
            .send([[1]])
            .expect(400)
            .end((err, response) => {
                const errors = response.body.errors;
                expect(2).to.equal(errors.length);
                expect('Flight must have two elements').to.eq(errors[0].msg);
                expect('Flight departure and arrivals must be string').to.eq(errors[1].msg);
                done(err);
            });
    });

    it('POST list of list of str is 400 Bad Request', (done) => {
        request(app)
            .post('/calculate')
            .send([["A"]])
            .expect(400)
            .end((err, response) => {
                const errors = response.body.errors;
                expect(1).to.equal(errors.length);
                expect('Flight must have two elements').to.eq(errors[0].msg);
                done(err);
            });
    });

    it('POST one flight returns same flight', (done) => {
        const flight = [['SFO', 'EWR']];
        const expectedResult = ['SFO', 'EWR'];
        request(app)
            .post('/calculate')
            .send(flight)
            .expect(200)
            .end((err, response) => {
                expect(expectedResult).to.deep.eq(response.body);
                done(err);
            });
    });

});