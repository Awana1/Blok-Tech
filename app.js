// server.js
/******************************************
******** Inladen van NPM Packages *********
******************************************/

//gebruik maken van een node.js webapplicatie
const express = require('express');

const expressLayouts = require('express-ejs-layouts');

// gebruik maken van een wachtwoord encryptie (veiligheid)
const bcrypt = require('bcrypt');
// gebruik maken van een authenticatie method,
//samen met passport-local omdat we een local strategy gebruiken
const passport = require('passport');
// om gebruik te kunnen maken van mongodb
const mongoose = require('mongoose');

const flash = require('connect-flash');
const session = require('express-session');


const bodyParser = require('body-parser');
var path = require('path');



// app vatiable initializen met express
const app = express();



/***********************************
******** Database connectie ********
***********************************/

// Database configuratie
const db = require('./static/config/keys.ejs').MongoURI;

// connectie maken met Mongo
// object toevoegen en op true aangeven.
//mongoose.connect(db, { useNewUrlParser: true})
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})

  // met success een connectie kunnen maken
  .then(() => console.log('MongoDB Verbonden...'))

  // als er problemen voorkomen. dan komt het in de console log tevoorschijn
  .catch(err => console.log(err));







/*********************
 ******** EJS ********
 ********************/

//aangeven dat de static bestand een express layout is
app.use('/static', express.static(__dirname + '/static'));




// view engine instellen naar EJS
app.set('view engine', 'ejs');                   
//app.set('views', 'views');   



/*****************************
 ******** Body Parser ********
 ****************************/
// door de NPM Package Body-parser te gebruiken, kunnen we inkomende streams exposen op req.

// zo kunnen we data uit onze formulier halen d.m.v request.body .
app.use(express.urlencoded({ extended: false} ));











/*********************************
 ******** Paginas inladen ********
 ********************************/

// get requests voor het inladen van specifieke .ejs / pagina bestanden
// naast res.render staan er ook variables voor pagina titel en naam van pagina. 
// Dit wordt later opgeroepen in de specifieke .ejs bestanden bij de bijbehorende HTML tags

// standaard pagina inladen zodra gebruiker op localhost:${PORT} gaat.
app.get('/', function (req, res)  { 
  res.render('pages/index', { title: 'Lovr - Home', page_name: 'Home' }); 
});

// homepagina inladen
app.get('/index', function(req, res) {
  res.render('pages/index', { title: 'Lovr - Home', page_name: 'home' });
});

// login pagina inladen
app.get('/login', function(req, res){
  res.render('pages/login', { title: 'Lovr - Login', page_name: 'login' });
});

// login pagina inladen 
app.get('/registreren', function(req, res){
  res.render('pages/registreren', { title: 'Lovr - registreren', page_name: 'registreren' });
});

// over pagina inladen
app.get('/over', function(req, res) {
    res.render('pages/over', { title: 'Lovr - Over', page_name: 'over' });
});

// diensten pagina inladen
app.get('/diensten', function(req, res) {
  res.render('pages/diensten', { title: 'Lovr - Diensten', page_name: 'diensten' });
});

// contact pagina inladen 
app.get('/contact', function(req, res){
  res.render('pages/contact', { title: 'Lovr - Contact', page_name: 'contact' });
});

// 404 pagina inladen, 
// dit wordt toegepast zodra de gebruiker naar een bestand probeert te gaan die niet bestaat.
app.get('/*', function(req, res){
  res.render('pages/404', { title: 'Lovr - 404 Not Found', page_name: '404 Not Found' });
});


/************************
 ******** Routes ********
 ***********************/

// Routes
app.use('/', require('./static/routes/index'));
app.use('/users', require('./static/routes/users'));

//deploy port variable op poort 3000, wordt later opgeroepen met PORT variable
const PORT = process.env.PORT || 3000;


// aangeven dat server moet draaien met de gekozen poort
app.listen(PORT ,() =>
console.log(`Server draait op poort ${PORT}`)
);
