const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const { user } = require('../db/index');
const app = express();
const PORT = process.env.PORT || 3003;


passport.use(new FacebookStrategy({
  clientID: '259611373759652',
  clientSecret: 'f91df7a5e17de1712404c9e0421439cd',
  callbackURL: 'http://localhost:3003/auth/facebook/callback',
}, (accessToken, refreshToken, profile, done) => { 
  const newUser = new user({
    facebookId: profile.id,
    displayName: profile.displayName,
  });
  
  newUser.save()
    .then((savedUser) => {
      return done(null, savedUser);
    })
    .catch((err) => {
      console.error('Error saving user:', err);
      return done(err);
    });
},
  

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
}),

passport.deserializeUser((id, done) => {
    user.findById(id).exec()
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        console.error('Error finding user by ID:', err);
        done(err);
      });
  }),
  

// Configure express to use passport and sessions
app.use(session({ secret: 'f91df7a5e17de1712404c9e0421439cd', resave: true, saveUninitialized: true })),
app.use(passport.initialize()),
app.use(passport.session()),

// Facebook authentication routes
app.get('/auth/facebook', passport.authenticate('facebook', { authType: 'rerequest' })),


app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to the home page
    res.redirect('/');
  }
),
app.get('/auth-check', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      displayName: req.user.displayName,
    });
  }
  else {
    res.json({ authenticated: false });
  }
}),


// Display user info on the home page
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('http://localhost:3000/home');
   }else {
    // app.get('/auth/facebook', passport.authenticate('facebook', { authType: 'rerequest' }));
  }
}
)
)
)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
