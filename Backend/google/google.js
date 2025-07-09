const express = require('express');
const passport = require('passport');
const session = require('express-session');
const UserModel = require('./google_mongo');
const cors = require('cors');
require('dotenv').config();
require('./google_pass');
// const http = require('http');
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());



app.get('/auth', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/callback',
  
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/'
  })
);



app.get('/home', async (req, res) => {
    try {
      // console.log('Entering /home route');
      // console.log(req.user);
  
      const Googledata = new UserModel({
        name: req.user.displayName,
        gmailid: req.user.email,
      });
  
      const data = await Googledata.save();
      res.redirect("http://localhost:3000/home")
      // res.send(data);
    } catch (error) {
      console.error('Error in /home route:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
// Failure
app.get('/', (req, res) => {
  res.send("Error");
  
});

app.listen(4000, () => {
  console.log(`Listening on port ${4000}`);
});
