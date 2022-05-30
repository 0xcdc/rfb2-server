import supertest from 'supertest';
import chai from 'chai';
const should = chai.should();
const url = `http://localhost:4000`;
const request = supertest(url);

describe('visit', () => {
  it('first visits for year', (done) => {
    request.post('/graphql')
    .send({ query: `{
      firstVisitsForYear(year: 2022) {
        id householdId householdVersion date
      }
    }` })
    .expect(200)
    .end((err, res) => {
      // res will contain array of all clients
      if (err) return done(err);
      should.exist(res.body.data);
      should.exist(res.body.data.firstVisitsForYear);
      // assume there are clients in the database
      res.body.data.firstVisitsForYear.should.have.lengthOf.above(0);
      res.body.data.firstVisitsForYear[0].should.have.property('householdId');
      res.body.data.firstVisitsForYear[0].should.have.property('householdVersion');
      res.body.data.firstVisitsForYear[0].should.have.property('date');
      res.body.data.firstVisitsForYear[0].should.have.property('id');
      done();
    })
  })


});
