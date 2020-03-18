// passport 
const localStrategy = require('passport-local').Strategy;

// we loggen in. daarvoor hebben we mongoose nodig om te kijken of alles met de db overeenkomt
const mongoose = require('mongoose');

// decrypten van de hash password zodat we kunnen valideren of de ingevoerde wachtwoord overeen komt met de wachtwoord in de db.
const bcrypt = require('bcryptjs');

// inladen van user model
const User = require('../models/User');

// !passport is niet bovenaan included omdat we het van de app.js file ophalen.
module.exports = function(passport){
     passport.use(
          new localStrategy({usernameField: 'email' }, (email, password, done) => {
               // gebruiker matchen
               User.findOne({email: email})
               .then(user => {
                    if(!user){
                         //callback
                         return done(null, false, {message: 'Ingevoerde email in niet geregistreerd'})
                    }

                    // wachtwoord matchen met bcrypy
                    bcrypt.compare(password, user.password, (err, isMatch) =>{
                         if(err) throw err;
                         if(isMatch){
                              return done(null, user);
                         }
                         else{
                              return done(null, false, { message: 'Wachtwoord incorrect'}); 
                         }
                    })

               })
               .catch(err => console.log(err))
          })
     )

     // sessions (passportjs.org documentatie)
     passport.serializeUser(function(user, done) {
          done(null, user.id);
        });
      
        passport.deserializeUser(function(id, done) {
          User.findById(id, function(err, user) {
            done(err, user);
          });
        });




}
