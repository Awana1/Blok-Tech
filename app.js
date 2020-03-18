/******************************************
******** Inladen van NPM Packages *********
******************************************/

//gebruik maken van een node.js webapplicatie
const express = require('express');

// gebruik maken van een authenticatie method,
//samen met passport-local omdat we een local strategy gebruiken
const passport = require('passport');

// om gebruik te kunnen maken van mongodb
const mongoose = require('mongoose');

// berichten/meldingen renderen in combinatie met express-session
const flash = require('connect-flash');
const session = require('express-session');

const path = require('path');

// app vatiable initializen met express
const app = express();

// passport configuratie voor passport.js
require('./config/passport')(passport);


/***********************************
******** Database connectie ********
***********************************/

// Database configuratie
const db = require('./config/keys.ejs').MongoURI;

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
app.use(express.static(path.join(__dirname, 'views')));


// view engine instellen naar EJS
app.set('view engine', 'ejs');  
app.set('views', 'views');   



/*****************************
 ******** Body Parser ********
 ****************************/
// door de NPM Package Body-parser te gebruiken, kunnen we inkomende streams exposen op req.

// zo kunnen we data uit onze formulier halen d.m.v request.body .
app.use(express.urlencoded({ extended: true } ));

// express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


/**************************
 ******** Passport ********
 *************************/

// passport middleare omdat we gebruik maken van een express gebaseerder applicatie
app.use(passport.initialize());

// voor login sessions
app.use(passport.session());


/**************************
 ******** Flash ********
 *************************/
//voor flash meldingen tijdens het inloggen en registreren

//toegang tot request.flash
app.use(flash());

// Globale variables voor diverse soort meldingen na het versturen van de formulieren
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
  app.use(flash());
});


/*********************************
 ******** Paginas inladen ********
 ********************************/

// get requests voor het inladen van specifieke .ejs / pagina bestanden
// naast res.render staan er ook variables voor pagina titel en naam van pagina. 
// Dit wordt later opgeroepen in de specifieke .ejs bestanden bij de bijbehorende HTML tags

// standaard pagina inladen zodra gebruiker op localhost:${PORT} gaat.
app.get('/', function (req, res)  { 
  res.render('./index', { title: 'Lovr - Home', page_name: 'Home' }); 
});

// homepagina inladen
app.get('/index', function(req, res) {
  res.render('./index', { title: 'Lovr - Home', page_name: 'Home' });
});

// login pagina inladen
app.get('/login', function(req, res){
  res.render('./login', { title: 'Lovr - Login', page_name: 'Login' });
});

// login pagina inladen 
app.get('/registreren', function(req, res){
  res.render('./registreren', { title: 'Lovr - Registreren', page_name: 'registreren' });
});

// over pagina inladen
app.get('/over', function(req, res) {
    res.render('./over', { title: 'Lovr - Over', page_name: 'over' });
});

// diensten pagina inladen
app.get('/diensten', function(req, res) {
  res.render('./diensten', { title: 'Lovr - Diensten', page_name: 'diensten' });
});

// contact pagina inladen 
app.get('/contact', function(req, res){
  res.render('./contact', { title: 'Lovr - Contact', page_name: 'contact' });
});

// 404 pagina inladen, 
// dit wordt toegepast zodra de gebruiker naar een bestand probeert te gaan die niet bestaat.
app.get('/*', function(req, res){
  res.render('./404', { title: 'Lovr - 404', page_name: '404' });
});


/************************
 ******** Routes ********
 ***********************/

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

//deploy port variable op poort 3000, wordt later opgeroepen met PORT variable
const PORT = process.env.PORT || 3000;

// aangeven dat server moet draaien met de gekozen poort
app.listen(PORT ,() =>
console.log(`Server draait op poort ${PORT}`)
);
