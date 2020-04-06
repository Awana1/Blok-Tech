// passport
// https://www.npmjs.com/package/passport

const LocalStrategy = require('passport-local').Strategy;

// decrypten van de hash password zodat we kunnen valideren of de ingevoerde wachtwoord overeen komt met de wachtwoord in de db.
const bcrypt = require('bcryptjs');

// Inladen van user model
const User = require('../models/User');

// !passport is niet bovenaan included omdat we het van de app.js file ophalen.
module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // gebruiker matchen
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          // callback
          return done(null, false, { message: 'Ingevoerde email is niet geregistreerd.' });
        }

        // wachtwoord controleren met bcrypt
        // Bron: https://www.npmjs.com/package/bcryptjs
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Wachtwoord incorrect.' });
          }
        });
      });
    })
  );

  module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Log in om dit bron te bekijken');
      res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/dashboard');
    }
  };

  // sessions (passportjs.org documentatie)
  // bron http://www.passportjs.org/docs/downloads/html/
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
