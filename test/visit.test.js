import chai from 'chai';
import credentials from '../credentials.js';
import supertest from 'supertest';

const should = chai.should();
const url = `http://localhost:4000`;
const request = supertest(url);

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

describe('visit', () => {
  it('first visits for year', done => {
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query: `{
        firstVisitsForYear(year: ${currentYear}) {
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
      });
  });

  it('visits for household', done => {
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query: `{
      visitsForHousehold(householdId: 2) {
        id householdId householdVersion date
      }
    }` })
      .expect(200)
      .end((err, res) => {
      // res will contain array of all clients
        if (err) return done(err);
        should.exist(res.body.data);
        should.exist(res.body.data.visitsForHousehold);
        // assume there are clients in the database
        res.body.data.visitsForHousehold.should.have.lengthOf.above(0);
        res.body.data.visitsForHousehold[0].should.have.property('householdId');
        res.body.data.visitsForHousehold[0].should.have.property('householdVersion');
        res.body.data.visitsForHousehold[0].should.have.property('date');
        res.body.data.visitsForHousehold[0].should.have.property('id');
        done();
      });
  });

  it('visits for month', done => {
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query: `{
      visitsForMonth(year: ${currentYear}, month: ${currentMonth}) {
        id householdId householdVersion date
      }
    }` })
      .expect(200)
      .end((err, res) => {
      // res will contain array of all clients
        if (err) return done(err);
        should.exist(res.body.data);
        should.exist(res.body.data.visitsForMonth);
        // assume there are clients in the database
        res.body.data.visitsForMonth.should.have.lengthOf.above(0);
        res.body.data.visitsForMonth[0].should.have.property('householdId');
        res.body.data.visitsForMonth[0].should.have.property('householdVersion');
        res.body.data.visitsForMonth[0].should.have.property('date');
        res.body.data.visitsForMonth[0].should.have.property('id');
        done();
      });
  });
});
