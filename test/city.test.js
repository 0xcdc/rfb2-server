import { Should } from 'chai';
import credentials from '../credentials.js';
import supertest from 'supertest';

const should = new Should();
const url = `http://localhost:4000`;
const request = supertest(url);

describe('city', () => {
  it('Returns all cities', done => {
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query: '{ cities { id name break_out in_king_county } }' })
      .expect(200)
      .end((err, res) => {
      // res will contain array of all cities
        if (err) return done(err);
        should.exist(res.body.data);
        should.exist(res.body.data.cities);
        // assume there are a 91 cities in the database
        res.body.data.cities.should.have.lengthOf(91);
        done();
      });
  });
});
