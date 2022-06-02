import credentials from '../credentials';
import supertest from 'supertest';
import chai from 'chai';
const should = chai.should();
const url = `http://localhost:4000`;
const request = supertest(url);

describe('mutations', () => {
  let newHouseholdId = null;
  let newHouseholdVersion = null;
  let newVisitIds = [];
  let newClientId = null;

  it('create a new household', (done) => {
    request.post('/graphql')
    .auth(credentials.websiteUsername, credentials.websitePassword)
    .send({ query: `mutation{
      updateHousehold(household:{
        id: -1,
        address1: "one",
        address2: "two",
        cityId: 1,
        zip: "98052",
        incomeLevelId: 1,
        note: "three"
      }) {
        id
        version
        address1
        address2
        cityId
        zip
        incomeLevelId
        note
      }
    }` })
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      should.exist(res.body.data);
      should.exist(res.body.data.updateHousehold);

      res.body.data.updateHousehold.should.have.property('id');
      res.body.data.updateHousehold.should.have.property('version');
      res.body.data.updateHousehold.should.have.property('address1');
      res.body.data.updateHousehold.should.have.property('address2');
      res.body.data.updateHousehold.should.have.property('cityId');
      res.body.data.updateHousehold.should.have.property('zip');
      res.body.data.updateHousehold.should.have.property('incomeLevelId');
      res.body.data.updateHousehold.should.have.property('note');

      res.body.data.updateHousehold.id.should.not.equal(-1);
      res.body.data.updateHousehold.id.should.not.equal(1);
      res.body.data.updateHousehold.version.should.equal(1);
      res.body.data.updateHousehold.address1.should.equal('one');
      res.body.data.updateHousehold.address2.should.equal('two');
      res.body.data.updateHousehold.cityId.should.equal(1);
      res.body.data.updateHousehold.zip.should.equal('98052');
      res.body.data.updateHousehold.incomeLevelId.should.equal(1);
      res.body.data.updateHousehold.note.should.equal('three');

      newHouseholdId = res.body.data.updateHousehold.id;
      newHouseholdVersion = res.body.data.updateHousehold.version;

      done();
    })
  })

  it('new household should get a visit recorded automatically', (done) => {
    request.post('/graphql')
    .auth(credentials.websiteUsername, credentials.websitePassword)
    .send({ query: `{
      visitsForHousehold(householdId: ${newHouseholdId}) {
        id
        date
        householdId
        householdVersion
      }
    }` })
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      should.exist(res.body.data);
      should.exist(res.body.data.visitsForHousehold);
      res.body.data.visitsForHousehold.should.have.lengthOf(1);

      res.body.data.visitsForHousehold[0].should.have.property('id');
      res.body.data.visitsForHousehold[0].should.have.property('householdId');
      res.body.data.visitsForHousehold[0].should.have.property('householdVersion');
      res.body.data.visitsForHousehold[0].should.have.property('date');

      newVisitIds.push(res.body.data.visitsForHousehold[0].id);
      done();
    })
  })

  it('update the new household', (done) => {
    request.post('/graphql')
    .auth(credentials.websiteUsername, credentials.websitePassword)
    .send({ query: `mutation{
      updateHousehold(household:{
        id: ${newHouseholdId},
        address1: "four",
        address2: "five",
        cityId: 2,
        zip: "98008",
        incomeLevelId: 2,
        note: "six"
      }) {
        id
        version
        address1
        address2
        cityId
        zip
        incomeLevelId
        note
      }
    }` })
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      should.exist(res.body.data);
      should.exist(res.body.data.updateHousehold);

      res.body.data.updateHousehold.should.have.property('id');
      res.body.data.updateHousehold.should.have.property('version');
      res.body.data.updateHousehold.should.have.property('address1');
      res.body.data.updateHousehold.should.have.property('address2');
      res.body.data.updateHousehold.should.have.property('cityId');
      res.body.data.updateHousehold.should.have.property('zip');
      res.body.data.updateHousehold.should.have.property('incomeLevelId');
      res.body.data.updateHousehold.should.have.property('note');

      res.body.data.updateHousehold.id.should.equal(newHouseholdId);
      res.body.data.updateHousehold.version.should.equal(2);
      res.body.data.updateHousehold.address1.should.equal('four');
      res.body.data.updateHousehold.address2.should.equal('five');
      res.body.data.updateHousehold.cityId.should.equal(2);
      res.body.data.updateHousehold.zip.should.equal('98008');
      res.body.data.updateHousehold.incomeLevelId.should.equal(2);
      res.body.data.updateHousehold.note.should.equal('six');

      newHouseholdVersion = res.body.data.updateHousehold.version;

      done();
    })
  })

  it('updating a household should not record a visit', (done) => {
    request.post('/graphql')
    .auth(credentials.websiteUsername, credentials.websitePassword)
    .send({ query: `{
      visitsForHousehold(householdId: ${newHouseholdId}) {
        id
        date
        householdId
        householdVersion
      }
    }` })
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      should.exist(res.body.data);
      should.exist(res.body.data.visitsForHousehold);
      res.body.data.visitsForHousehold.should.have.lengthOf(1);

      done();
    })
  })

  it('create a new client', (done) => {
    request.post('/graphql')
    .auth(credentials.websiteUsername, credentials.websitePassword)
    .send({ query: `
      mutation {
        updateClient(
          client: {
            id: -1,
            householdId: ${newHouseholdId},
            name: "one",
            raceId: 1,
            disabled: 1,
            birthYear: "2000",
            genderId: 1,
            refugeeImmigrantStatus: 1,
            speaksEnglish: 1,
            militaryStatusId: 1,
            ethnicityId: 1}) {
              id
              householdId
              name
              raceId
              disabled
              birthYear
              genderId
              refugeeImmigrantStatus
              speaksEnglish
              militaryStatusId
              ethnicityId
            }
          }
       `})
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      should.exist(res.body.data);
      should.exist(res.body.data.updateClient);

      res.body.data.updateClient.should.have.property('id');
      res.body.data.updateClient.should.have.property('householdId');
      res.body.data.updateClient.should.have.property('name');
      res.body.data.updateClient.should.have.property('raceId');
      res.body.data.updateClient.should.have.property('disabled');
      res.body.data.updateClient.should.have.property('birthYear');
      res.body.data.updateClient.should.have.property('genderId');
      res.body.data.updateClient.should.have.property('refugeeImmigrantStatus');
      res.body.data.updateClient.should.have.property('speaksEnglish');
      res.body.data.updateClient.should.have.property('militaryStatusId');
      res.body.data.updateClient.should.have.property('ethnicityId');

      res.body.data.updateClient.id.should.not.equal(-1);
      res.body.data.updateClient.householdId.should.equal(newHouseholdId);
      res.body.data.updateClient.name.should.equal('one');
      res.body.data.updateClient.raceId.should.equal(1);
      res.body.data.updateClient.disabled.should.equal(1);
      res.body.data.updateClient.birthYear.should.equal('2000');
      res.body.data.updateClient.genderId.should.equal(1);
      res.body.data.updateClient.refugeeImmigrantStatus.should.equal(1);
      res.body.data.updateClient.speaksEnglish.should.equal(1);
      res.body.data.updateClient.militaryStatusId.should.equal(1);
      res.body.data.updateClient.ethnicityId.should.equal(1);

      newHouseholdVersion += 1;
      newClientId = res.body.data.updateClient.id;

      done();
    })
  })

  it('update the new client', (done) => {
    request.post('/graphql')
    .auth(credentials.websiteUsername, credentials.websitePassword)
    .send({ query: `
      mutation {
        updateClient(
          client: {
            id: ${newClientId},
            householdId: ${newHouseholdId},
            name: "two",
            raceId: 2,
            disabled: 0,
            birthYear: "2001",
            genderId: 2,
            refugeeImmigrantStatus: 0,
            speaksEnglish: 0,
            militaryStatusId: 2,
            ethnicityId: 2}) {
              id
              householdId
              name
              raceId
              disabled
              birthYear
              genderId
              refugeeImmigrantStatus
              speaksEnglish
              militaryStatusId
              ethnicityId
            }
          }
       `})
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      should.exist(res.body.data);
      should.exist(res.body.data.updateClient);

      res.body.data.updateClient.should.have.property('id');
      res.body.data.updateClient.should.have.property('householdId');
      res.body.data.updateClient.should.have.property('name');
      res.body.data.updateClient.should.have.property('raceId');
      res.body.data.updateClient.should.have.property('disabled');
      res.body.data.updateClient.should.have.property('birthYear');
      res.body.data.updateClient.should.have.property('genderId');
      res.body.data.updateClient.should.have.property('refugeeImmigrantStatus');
      res.body.data.updateClient.should.have.property('speaksEnglish');
      res.body.data.updateClient.should.have.property('militaryStatusId');
      res.body.data.updateClient.should.have.property('ethnicityId');

      res.body.data.updateClient.id.should.equal(newClientId);
      res.body.data.updateClient.householdId.should.equal(newHouseholdId);
      res.body.data.updateClient.name.should.equal('two');
      res.body.data.updateClient.raceId.should.equal(2);
      res.body.data.updateClient.disabled.should.equal(0);
      res.body.data.updateClient.birthYear.should.equal('2001');
      res.body.data.updateClient.genderId.should.equal(2);
      res.body.data.updateClient.refugeeImmigrantStatus.should.equal(0);
      res.body.data.updateClient.speaksEnglish.should.equal(0);
      res.body.data.updateClient.militaryStatusId.should.equal(2);
      res.body.data.updateClient.ethnicityId.should.equal(2);

      newHouseholdVersion += 1;

      done();
    })
  })

  it('record a visit', (done) => {
    const query = `
      mutation { recordVisit(householdId:${newHouseholdId}) {
        id
        date
        householdId
        householdVersion
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
      res.body.data.recordVisit.should.have.property('householdVersion');
      res.body.data.recordVisit.should.have.property('date');

      newVisitIds.push(res.body.data.recordVisit.id);

      done();
    })
  })

  it('delete a visit', (done) => {
    const visitId = newVisitIds.pop();
    const query = `
      mutation { deleteVisit(
        id:${visitId},
      ) {
        id
        date
        householdId
        householdVersion
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
      res.body.data.deleteVisit.should.have.property('householdVersion');
      res.body.data.deleteVisit.should.have.property('date');

      done();
    })
  })

  it('delete a client', (done) => {
    const query = `
      mutation { deleteClient(
        id:${newClientId},
      ) {
        id
        name
      }
    }`;
    request.post('/graphql')
    .auth(credentials.websiteUsername, credentials.websitePassword)
    .send({ query })
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      should.exist(res.body.data);
      should.exist(res.body.data.deleteClient);

      res.body.data.deleteClient.should.have.property('id');
      res.body.data.deleteClient.should.have.property('name');

      done();
    })
  })


});
