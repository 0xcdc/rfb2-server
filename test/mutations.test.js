import { Should } from 'chai';
import credentials from '../credentials.js';
import supertest from 'supertest';

const should = new Should();
const url = `http://localhost:4000`;
const request = supertest(url);

describe('mutations', () => {
  let newHousehold = null;
  const newVisitIds = [];
  let newClient = null;

  it('create a new household', done => {
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query: `mutation{
      createNewHousehold {
        id
        address1
        address2
        cityId
        zip
        incomeLevelId
        note
        clients { id }
      }
    }` })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        should.exist(res.body.data);
        should.exist(res.body.data.createNewHousehold);

        newHousehold = res.body.data.createNewHousehold;

        newHousehold.should.have.property('id');
        newHousehold.should.have.property('address1');
        newHousehold.should.have.property('address2');
        newHousehold.should.have.property('cityId');
        newHousehold.should.have.property('zip');
        newHousehold.should.have.property('incomeLevelId');
        newHousehold.should.have.property('note');

        newHousehold.id.should.not.equal(-1);
        newHousehold.id.should.not.equal(1);
        newHousehold.address1.should.equal('');
        newHousehold.address2.should.equal('');
        newHousehold.cityId.should.equal(0);
        newHousehold.zip.should.equal('');
        newHousehold.incomeLevelId.should.equal(0);
        newHousehold.note.should.equal('');

        done();
      });
  });

  it('new household should NOT get a visit recorded automatically', done => {
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query: `{
      visitsForHousehold(householdId: ${newHousehold.id}) {
        id
        date
        householdId
      }
    }` })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (res.body.errors) done(res.body.errors[0].message);
        should.exist(res.body.data);
        should.exist(res.body.data.visitsForHousehold);
        res.body.data.visitsForHousehold.should.have.lengthOf(0);

        done();
      });
  });

  it('create a new client', done => {
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query: `mutation {
  newClient:createNewClient {
    id
    name
    disabled
    birthYear
    genderId
    refugeeImmigrantStatus
    speaksEnglish
    militaryStatusId
    ethnicityId
    phoneNumber
    raceId
  }
}` })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        should.exist(res.body.data);
        should.exist(res.body.data.newClient);

        ({ newClient } = res.body.data);

        newClient.id.should.not.equal(-1);
        newClient.id.should.not.equal(0);
        newClient.id.should.not.equal(1);

        done();
      });
  });

  it('try and update the new household w/o the new client', done => {
    newHousehold.address1 = 'four';
    newHousehold.address2 = 'five';
    newHousehold.cityId = 2;
    newHousehold.zip = '98008';
    newHousehold.incomeLevelId = 2;
    newHousehold.note = 'six';

    const query = `
mutation saveHouseholdChanges($household: HouseholdInput!){
  updateHousehold(household: $household) {
    id
    address1
    address2
    cityId
    zip
    incomeLevelId
    note
  }
}`;
    const variables = { household: newHousehold };
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query, variables })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        should.exist(res.body.errors);
        res.body.errors.length.should.be.greaterThan(0);
        should.exist(res.body.errors[0].message);

        res.body.errors[0].message.should.equal('there must be at least one client');

        done();
      });
  });

  it('try and update the new household w/ the new client but w/o a name', done => {
    newHousehold.clients.push(newClient);

    const query = `
mutation saveHouseholdChanges($household: HouseholdInput!){
  updateHousehold(household: $household) {
    id
    address1
    address2
    cityId
    zip
    incomeLevelId
    note
  }
}`;
    const variables = { household: newHousehold };
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query, variables })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        should.exist(res.body.errors);
        res.body.errors.length.should.be.greaterThan(0);
        should.exist(res.body.errors[0].message);

        res.body.errors[0].message.should.equal('every client must have a name');

        done();
      });
  });

  it('update the new household w/ the new client', done => {
    newClient.name = 'bob';

    const query = `
mutation saveHouseholdChanges($household: HouseholdInput!){
  updateHousehold(household: $household) {
    id
    address1
    address2
    cityId
    zip
    incomeLevelId
    note
  }
}`;
    const variables = { household: newHousehold };
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query, variables })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        if (res.body.errors) done(res.body.errors[0].message);

        should.exist(res.body.data);
        should.exist(res.body.data.updateHousehold);

        res.body.data.updateHousehold.should.have.property('id');
        res.body.data.updateHousehold.should.have.property('address1');
        res.body.data.updateHousehold.should.have.property('address2');
        res.body.data.updateHousehold.should.have.property('cityId');
        res.body.data.updateHousehold.should.have.property('zip');
        res.body.data.updateHousehold.should.have.property('incomeLevelId');
        res.body.data.updateHousehold.should.have.property('note');

        res.body.data.updateHousehold.id.should.equal(newHousehold.id);
        res.body.data.updateHousehold.address1.should.equal('four');
        res.body.data.updateHousehold.address2.should.equal('five');
        res.body.data.updateHousehold.cityId.should.equal(2);
        res.body.data.updateHousehold.zip.should.equal('98008');
        res.body.data.updateHousehold.incomeLevelId.should.equal(2);
        res.body.data.updateHousehold.note.should.equal('six');


        done();
      });
  });

  it('updating a household should not record a visit', done => {
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query: `{
      visitsForHousehold(householdId: ${newHousehold.id}) {
        id
        date
        householdId
      }
    }` })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        should.exist(res.body.data);
        should.exist(res.body.data.visitsForHousehold);
        res.body.data.visitsForHousehold.should.have.lengthOf(0);

        done();
      });
  });

  it('record a visit', done => {
    const query = `
      mutation { recordVisit(householdId:${newHousehold.id}) {
        id
        date
        householdId
      }
    }`;
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        should.exist(res.body.data);
        should.exist(res.body.data.recordVisit);

        res.body.data.recordVisit.should.have.property('id');
        res.body.data.recordVisit.should.have.property('householdId');
        res.body.data.recordVisit.should.have.property('date');

        res.body.data.recordVisit.householdId.should.equal(newHousehold.id);

        newVisitIds.push(res.body.data.recordVisit.id);

        done();
      });
  });

  it('delete a visit', done => {
    const visitId = newVisitIds.pop();
    const query = `
      mutation { deleteVisit(
        id:${visitId},
      ) {
        id
        date
        householdId
      }
    }`;
    request.post('/graphql')
      .auth(credentials.websiteUsername, credentials.websitePassword)
      .send({ query })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        should.exist(res.body.data);
        should.exist(res.body.data.deleteVisit);

        res.body.data.deleteVisit.should.have.property('id');
        res.body.data.deleteVisit.should.have.property('householdId');
        res.body.data.deleteVisit.should.have.property('date');

        done();
      });
  });
});
