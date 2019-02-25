const request = require('request');
const db = require('../config/db');

const createRootUser = require('./fixtures/createRootUser');
const { dummyUser1 } = require('./fixtures/users');

describe('server', () => {
  let rootSponsorID;
  beforeAll(async () => {
    await db.connect();
    await db.query('DROP TABLE Person');
    await createRootUser().then(rootUser => {
      rootSponsorID = rootUser.person_id;
    });
    await db.end();
  });
  it('signup a user correctly', done => {
    const sponsor_id = rootSponsorID;
    request.post(
      {
        url: 'http://localhost:3000/signup',
        body: { ...dummyUser1, sponsor_id },
        json: true
      },
      (err, response, body) => {
        body = Object.assign(body, { person_id: body.person_id });
        expect(body).toEqual({
          sponsor_id,
          person_id: expect.any(Number),
          phone: dummyUser1.phone,
          name: dummyUser1.name
        });
        done();
      }
    );
  });
});
