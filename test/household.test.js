import credentials from '../credentials.js';
import { Should } from 'chai';
import supertest from 'supertest';

const should = Should();
const url = `http://localhost:4000`;
const request = supertest(url);

describe('household', () => {
  it('Returns all households', done => {
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query: `{
      households(ids:[100,101]) {
        id
        note
      }
    }` })
      .expect(200)
      .end((err, res) => {
      // res will contain array of all households
        if (err) return done(err);
        should.exist(res.body.data);
        should.exist(res.body.data.households);
        // assume there are households in the database
        res.body.data.households.should.have.lengthOf(2);
        done();
      });
  });

  const props = [
    'id',
    'version',
    'address1',
    'address2',
    'cityId',
    'zip',
    'incomeLevelId',
    'householdSize',
    'note',
  ];

  it('Returns household  with id = 2', done => {
    const query = `{household(id: 2) {
         id
         version
         address1
         address2
         cityId
         zip
         incomeLevelId
         note
         householdSize
         clients {
           id
           name
           householdId
           genderId
           disabled
           refugeeImmigrantStatus
           ethnicityId
           raceId
           speaksEnglish
           militaryStatusId
           birthYear
         }
       }}`;
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query })
      .expect(200)
      .end((err, res) => {
      // res will contain array with one user
        if (err) return done(err);
        should.exist(res.body.data);
        should.exist(res.body.data.household );
        props.forEach(prop => res.body.data.household .should.have.property(prop));
        should.exist(res.body.data.household.clients);
        res.body.data.household.clients.should.have.length.above(0);
        done();
      });
  });

  it('non existant household ', done => {
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query: '{ household (id: -100) { id note } }' })
      .expect(200)
      .end((err, res) => {
        if ( err ) return done(err);
        should.exist(res.body.data);
        should.not.exist(res.body.data.household );
        done();
      });
  });
});
