import supertest from 'supertest';
import chai from 'chai';
const should = chai.should();
const url = `http://localhost:4000`;
const request = supertest(url);

describe('GraphQL', () => {
  it('Returns all ethnicities', (done) => {
    request.post('/graphql')
    .send({ query: '{ ethnicities { id value } }' })
    .expect(200)
    .end((err, res) => {
      // res will contain array of all cities
      if (err) return done(err);
      should.exist(res.body.data);
      should.exist(res.body.data.ethnicities);
      // assume there are a 91 cities in the database
      res.body.data.ethnicities.should.have.lengthOf(3);
      done();
    })
  })

  it('Returns ethnicity with id = 1', (done) => {
    request.post('/graphql')
    .send({ query: '{ ethnicity(id: 1) { id value } }'})
    .expect(200)
    .end((err,res) => {
      // res will contain array with one user
      if (err) return done(err);
      should.exist(res.body.data);
      should.exist(res.body.data.ethnicity);
      res.body.data.ethnicity.should.have.property('id')
      res.body.data.ethnicity.should.have.property('value')
      done();
    })
  })

  it('non existant ethnicity', (done) => {
    request.post('/graphql')
    .send({ query: '{ ethnicity(id: -100) { id value } }'})
    .expect(200)
    .end((err,res) => {
      if ( err ) return done(err);
      should.exist(res.body.data);
      should.not.exist(res.body.data.ethnicity);
      done();
    })
  })

});
