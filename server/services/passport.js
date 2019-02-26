const passport = require('passport');
const db = require('../config/db');

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser(async (user_id, done) => {
  const user = await db
    .query(`SELECT DISTINCT person_id FROM Person WHERE person_id = ${user_id}`)
    .then(res => res.rows[0]);
  if (!user) {
    return done(true, null);
  }
  return done(null, user.person_id);
});
