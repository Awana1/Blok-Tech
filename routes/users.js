const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model inladen
const User = require('../models/User');

const ObjectID = require('mongodb').ObjectID;

const {
  forwardAuthenticated
} = require('../helpers/auth');

/************
 *****GET*****
 ************/

// Login Pagina
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Registreren pagina
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Profiel wijzigen pagina
router.get('/edit-profile', forwardAuthenticated, (req, res) => res.render('edit-profile'));


/*************
 *****POST*****
 *************/


// na het submitten van een formulier, wordt er een post request gemaakt naar /register
router.post('/register', (req, res) => {

  // elk invoer in aparte variables neerzetten
  const {
    name,
    email,
    password,
    password2
  } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({
      msg: 'Vul alle velden in'
    });
  }

  //check verplichte velden
  if (password != password2) {
    errors.push({
      msg: 'Wachtwoorden komen niet overeen'
    });
  }

  // check wachtwoord lengthe
  if (password.length < 5) {
    errors.push({
      msg: 'Wachtwoord moet uit 5 karakters bestaan'
    });
  }

  // als er meer dan 0 foutmeldingen voorkomen uit de formulier.
  if (errors.length > 0) {

    // register opnieuw renderen met variabelen.
    // we gebruiken variables omdat we er doorheen willen loopen en de msg's laten tonen.
    // dit zorgt ervoor dat de formulier niet leeg is na het submitten en opnieuw renderen.
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({
      email: email
    }).then(user => {
      if (user) {
        errors.push({
          msg: 'Email al in gebruik'
        });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'Dank u wel voor het registreren. U kunt nu inloggen.'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});



// Profiel wijzigen
router.post('/edit-profile', (req, res) => {
  const {
    name,
    age,
    location,
    hobbys,
    bio,
    school
  } = req.body;
  let errors = [];
  const id = req.user.id;

  if (!name || !age || !location || !hobbys || !bio || !school) {
    errors.push({
      msg: 'Vul alle velden in voor een complete profiel!'
    });
  }

  if (errors.length > 0) {
    res.render('edit-profile', {
      errors,
      name,
      age,
      location,
      school,
      hobbys,
      bio
    });
  } else {

    User.updateOne({
      '_id': ObjectID(id)
    }, {
      $set: {
        name,
        age,
        hobbys,
        bio,
        school
      }
    }, (err) => {
      if (err) {
        errors.push({
          msg: 'Foutmelding tijdens het updaten'
        });
      }
      req.flash(
        'success_msg',
        'Profielgegevens met success gewijzigd'
      );
      res.redirect('/dashboard');
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
