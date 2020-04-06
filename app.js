//gebruik maken van een node.js webapplicatie
const express = require('express');

const bodyParser = require('body-parser')
const router = require('./routes/index.js')
const dotenv = require('dotenv').config({ path: '.env' });

// om gebruik te kunnen maken van mongodb
const mongoose = require('mongoose');
// gebruik maken van een authenticatie method,
//samen met passport-local omdat we een local strategy gebruiken
const passport = require('passport');

// berichten/meldingen renderen in combinatie met express-session
const flash = require('connect-flash');
const session = require('express-session');


// app vatiable initializen met express
const app = express();

// Passport Config
require('./helpers/passport')(passport);

// DB Config
//connect with database
mongoose.connect(process.env.MONGODB_URI, {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: 'true',
  useUnifiedTopology: 'true',
  useCreateIndex: 'true'
})


// EJS
app.use('/public', express.static('public'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.set('views', 'views')


// Express session
app.use(
  session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
})
)

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
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server draait op poort ${PORT}`));

/* Bronnen:

    https://www.youtube.com/watch?v=fBNz5xF-Kx4
    https://www.youtube.com/watch?v=6FOq4cUdH8k&t=311s
    https://www.npmjs.com/package/bcryptjs
    https://www.npmjs.com/package/passport
    http://www.passportjs.org/docs/downloads/html/
    https://github.com/cmda-bt/be-course-19-20

*/
