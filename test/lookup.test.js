import { Should } from 'chai';
import credentials from '../credentials.js';
import supertest from 'supertest';

const should = new Should();
const url = `http://localhost:4000`;
const request = supertest(url);

describe('lookups', () => {
  const lookups = [{
    plural: 'ethnicities',
    singular: 'ethnicity',
    count: 3,
  },
  {
    plural: 'genders',
    singular: 'gender',
    count: 4,
  },
  {
    plural: 'incomeLevels',
    singular: 'incomeLevel',
    count: 5,
  },
  {
    plural: 'militaryStatuses',
    singular: 'militaryStatus',
    count: 4,
  },
  {
    plural: 'races',
    singular: 'race',
    count: 9,
  },
  {
    plural: 'yesNos',
    singular: 'yesNo',
    count: 3,
  }];

  lookups.forEach( lookup => {
    it(`Returns all ${lookup.plural}`, done => {
      const query = `{ ${lookup.plural} { id value } }`;
      request.post('/graphql')
        .auth(credentials.websiteUsername, credentials.websitePassword)
        .send({ query })
        .expect(200)
        .end((err, res) => {
        // res will contain array of all cities
          if (err) return done(err);
          should.exist(res.body.data);
          should.exist(res.body.data[lookup.plural]);
          res.body.data[lookup.plural].should.have.lengthOf(lookup.count);
          done();
        });
    });

    it(`Returns ${lookup.singular} with id = 1`, done => {
      request.post('/graphql')
        .auth(credentials.websiteUsername, credentials.websitePassword)
        .send({ query: `{ ${lookup.singular}(id: 1) { id value } }` })
        .expect(200)
        .end((err, res) => {
        // res will contain array with one user
          if (err) return done(err);
          should.exist(res.body.data);
          should.exist(res.body.data[lookup.singular]);
          res.body.data[lookup.singular].should.have.property('id');
          res.body.data[lookup.singular].should.have.property('value');
          done();
        });
    });

    it(`non existant ${lookup.singular}`, done => {
      request.post('/graphql')
        .auth(credentials.websiteUsername, credentials.websitePassword)
        .send({ query: `{ ${lookup.singular}(id: -100) { id value } }` })
        .expect(200)
        .end((err, res) => {
          if ( err ) return done(err);
          should.exist(res.body.data);
          should.not.exist(res.body.data[lookup.singular]);
          done();
        });
    });
  });
});
