import { Should } from 'chai';
import credentials from '../credentials.js';
import supertest from 'supertest';

const should = new Should();
const url = `http://localhost:4000`;
const request = supertest(url);

describe('lookups', () => {
  const lookups = [{
    plural: 'ethnicities',
    count: 3,
  },
  {
    plural: 'genders',
    count: 4,
  },
  {
    plural: 'incomeLevels',
    count: 5,
  },
  {
    plural: 'militaryStatuses',
    count: 4,
  },
  {
    plural: 'races',
    count: 9,
  },
  {
    plural: 'yesNos',
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
  });
});
