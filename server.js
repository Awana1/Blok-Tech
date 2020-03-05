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
    res.render('pages/index', {
      title: 'Lovr - Home',
      page_name: 'Home'
  });
    
});

// index page
app.get('/index', function(req, res) {
  res.render('pages/index', {
    title: 'Lovr - Home',
    page_name: 'home'
});
});

// login page
app.get('/login', function(req, res){
  res.render('pages/login', {
    title: 'Lovr - Login',
    page_name: 'login'
});
});

// over page
app.get('/over', function(req, res) {
    res.render('pages/over', {
      title: 'Lovr - Over',
      page_name: 'over'
  });
});

// diensten page
app.get('/diensten', function(req, res) {
  res.render('pages/diensten', {
    title: 'Lovr - Diensten',
    page_name: 'diensten'
});
});

// contact page
app.get('/contact', function(req, res){
  res.render('pages/contact', {
    title: 'Lovr - Contact',
    page_name: 'contact'
});
});

// 404 page
app.get('/*', function(req, res){
  res.render('pages/404', {
    title: 'Lovr - 404 Not Found',
    page_name: '404 Not Found'
});
});

app.listen(3000);
console.log('Server draait op poort 3000!');
