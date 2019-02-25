const request = require('request');

const { rootUserDetails } = require('./users');

function createRootUser() {
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: 'http://localhost:3000/signup',
        body: rootUserDetails,
        json: true
      },
      (err, response, body) => {
        if (err) {
          return reject(err);
        }
        return resolve(body);
      }
    );
  });
}

module.exports = createRootUser;
