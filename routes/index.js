const express = require('express');
const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require('../helpers/auth');

// Welkom pagina
router.get('/', forwardAuthenticated, (req, res) => res.render('index'));

// gebruiker dashboard inladen als de gebruiker ingelogd is.
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  }),
);

// edit profile dashboard inladen als de gebruiker ingelogd is.
router.get('/edit-profile', ensureAuthenticated, (req, res) =>
  res.render('edit-profile', {
    user: req.user
  }),
);

module.exports = router;
