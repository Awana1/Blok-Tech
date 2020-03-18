const express = require('express');
const router =  express.Router();
const bcrypt = require('bcryptjs');

// user model. Zo kunnen we methods op user roepen
const User = require('../models/User');

const passport = require('passport');

//login pagina
router.get('/login', (req, res) => res.render('login'));

//registeren pagina
router.get('/registreren', (req, res) => res.render('registreren'));

// na het submitten van een formulier, wordt er een post request gemaakt naar /register

// register handler
router.post('/registreren', (req, res) => {
  
     // elk invoer in aparte variables neerzetten
     const { name, email, password, password2 } = req.body;
     let errors = [];

     //check verplichte velden
     if(!name || !email || !password || !password2){
          errors.push({msg: 'Vul aub alle velden in'});
     }

     // check of wachtwoorden overeen komen
     if (password !== password2){
          errors.push({msg: 'wachtwoorden komen niet overeen'});
     }

     //wachtwoord lengthe valideren
     if(password.length < 7 ){
          errors.push({msg: 'wachtwoord moet minimaal uit 7 karakters bestaan'});
     }

     // als er meer dan 0 foutmeldingen voorkomen uit de formulier.
     if(errors.length > 0){

          // register opnieuw renderen met variabelen. 
          // we gebruiken variables omdat we er doorheen willen loopen en de msg's laten tonen.
          // dit zorgt ervoor dat de formulier niet leeg is na het submitten en opnieuw renderen.
          res.render('registreren', {
               errors,
               name,
               email,
               password,
               password2
          });

     }else{
          
            User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email al in gebruik' });
        res.render('registreren', {
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
          password
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
                  'Je hebt je zojuist geregistreerd! je kan nu inloggen.'
                );
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});


// login handler
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// uitloggen dmv passport middleware kunnen we uitloggen.
router.get('/logout', (req, res) => {
  req.logout();
  // flash message dat gebruiker is uitgelogd
  req.flash('success_msg', 'Je bent uitgelogd');
  // gebruiker redirecten naar login pagina
  res.redirect('/login');
});

module.exports = router;