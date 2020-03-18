const express = require('express');
const router =  express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welkom pagina
router.get('/', forwardAuthenticated, (req, res) => res.render('Welkom'));

// gebruiker dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('./dashboard', {
    user: req.user,
    title: 'Lovr - Dash', 
    page_name: 'dash' 
  })
);

module.exports = router;



