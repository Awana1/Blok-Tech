// server.js
// load the things we need
var express = require('express');
var app = express();


// set the view engine to ejs
app.set('view engine', 'ejs');


app.use(express.static('views'))




// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// login page
app.get('/login', function(req, res){
  res.render('pages/index');res.render('pages/login');
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// contact page
app.get('/contact', function(req, res){
  res.render('pages/contact')
});

// 404 page
app.get('/*', function(req, res){
  res.render('pages/404');
});

app.listen(3000);
console.log('Server draait op poort 3000!');
