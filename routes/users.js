const express = require('express');
const router =  express.Router();

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
          errors.push('Vul aub alle velden in');
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
          res.send('pass')
     }

});

module.exports = router;