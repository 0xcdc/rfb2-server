import credentials from '../credentials.js';
import supertest from 'supertest';
import chai from 'chai';

const should = chai.should();
const url = `http://localhost:4000`;
const request = supertest(url);

describe('city', () => {
  it('Returns all cities', (done) => {
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
    })
  })

  it('Returns city with id = 10', (done) => {
    request.post('/graphql')
    .auth(credentials.websiteUsername, credentials.websitePassword)
    .send({ query: '{ city(id: 10) { id name break_out in_king_county} }'})
    .expect(200)
    .end((err,res) => {
      // res will contain array with one user
      if (err) return done(err);
      should.exist(res.body.data);
      should.exist(res.body.data.city);
      res.body.data.city.should.have.property('id')
      res.body.data.city.should.have.property('name')
      res.body.data.city.should.have.property('break_out')
      res.body.data.city.should.have.property('in_king_county')
      done();
    })
  })

  it('non existant city', (done) => {
    request.post('/graphql')
    .auth(credentials.websiteUsername, credentials.websitePassword)
    .send({ query: '{ city(id: -100) { id name } }'})
    .expect(200)
    .end((err,res) => {
      if ( err ) return done(err);
      should.exist(res.body.data);
      should.not.exist(res.body.data.city);
      done();
    })
  })

});
