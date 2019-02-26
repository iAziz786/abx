const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const pgSession = require('connect-pg-simple')(session);
const dotenv = require('dotenv');
const next = require('next');
const ms = require('ms');
const passport = require('passport');

process.on('unhandledRejection', reason => {
  console.error(reason);
  process.exit(1);
});

// Use `dotenv` as top as make sense to this module. The reason being
// other code below might make use of environment variables
// So the use of `dotenv` is necessary as early as possible
dotenv.config();
require('./services/passport');

const db = require('./config/db');
(async function createConnectionToDB() {
  pgConn = await db.connect();
})();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(
    session({
      name: 'SID',
      store: new pgSession({
        conObject: {
          database: process.env.PGDATABASE,
          user: process.env.PGUSER,
          password: process.env.PGPASSWORD
        }
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: ms('30 days') }
    })
  );
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(logger('dev'));
  server.set('PORT', process.env.PORT || 3000);

  server.post('/signup', async (req, res) => {
    const { sponsor_id = null, phone, name, password } = req.body;
    await db.query(
      'CREATE TABLE IF NOT EXISTS Person (Person_ID SERIAL PRIMARY KEY, Sponsor_ID INTEGER REFERENCES Person(Person_ID), Phone varchar(20), Name varchar(255), Password varchar(255))'
    );
    const queryResponse = await db.query({
      text: `INSERT INTO Person (Sponsor_ID, Phone, Name, Password) VALUES ($1, $2, $3, $4) RETURNING Person_ID, Sponsor_ID, Name, Phone`,
      values: [sponsor_id, phone, name, password]
    });
    const response = queryResponse.rows[0];
    const { person_id: user_id } = response;
    req.logIn(user_id, err => {
      if (err) {
        throw new Error(err);
      }
      return res.redirect('/dashboard');
    });
  });

  server.get('*', (req, res, next) => {
    return handler(req, res, next);
  });

  server.listen(server.get('PORT'), () => {
    console.log('http://localhost:' + server.get('PORT'));
  });
});
