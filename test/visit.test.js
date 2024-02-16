import { Should } from 'chai';
import credentials from '../credentials.js';
import supertest from 'supertest';

const should = new Should();
const url = `http://localhost:4000`;
const request = supertest(url);

describe('visit', () => {
  it('visits for household', done => {
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query: `{
      visitsForHousehold(householdId: 2) {
        id householdId date
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
        res.body.data.visitsForHousehold[0].should.have.property('date');
        res.body.data.visitsForHousehold[0].should.have.property('id');
        done();
      });
  });


  it('householdVisitsForYear', done => {
    const year = new Date().getFullYear();
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query: `{
      householdVisitsForYear(year:${year}) {
        cityId
        date
        homeless
        householdId
        incomeLevelId
        visitId
        zip
        clients {
          age
          birthYear
          clientId
          disabled
          ethnicityId
          genderId
          militaryStatusId
          raceId
          refugeeImmigrantStatus
          speaksEnglish
        }
      }
    }` })
      .expect(200)
      .end((err, res) => {
      // res will contain array of all clients
        if (err) return done(err);
        if (res.body.errors) done(res.body.errors[0].message);
        should.exist(res.body.data);
        should.exist(res.body.data.householdVisitsForYear);
        const { householdVisitsForYear } = res.body.data;
        // assume there are clients in the database
        householdVisitsForYear.should.have.lengthOf.above(0);
        const [firstVisit] = householdVisitsForYear;
        firstVisit.should.have.property('householdId');
        firstVisit.should.have.property('date');
        firstVisit.should.have.property('visitId');
        firstVisit.should.have.property('homeless');
        firstVisit.should.have.property('clients');
        const { clients } = firstVisit;
        clients.should.have.length.greaterThan(0);
        const [firstClient] = clients;
        firstClient.should.have.property('age');

        done();
      });
  });

});
