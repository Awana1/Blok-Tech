module.exports = {
     ensureAuthenticated: function(req, res, next) {
       if (req.isAuthenticated()) {
         return next();
       }
       req.flash('error_msg', 'Log in om toegang te krijgen');
       res.redirect('/users/login');
     },
     forwardAuthenticated: function(req, res, next) {
       if (!req.isAuthenticated()) {
         return next();
       }
       res.redirect('/dashboard');      
     }
   };