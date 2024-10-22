const express = require('express');
const session = require('express-session');
const passport = require('./auth.js');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
app.use(
  session({
    secret: 'keyboard cat', 
    name:'kassSDf',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

function isLoggedIn(req, res, next) {
  req.user ? next() : res.send(401);
}

//Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Definir pasta de arquivos
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
  const { accessToken } = req.user;
  console.log("Token ==> ", accessToken)
  res.render('index', { user: req.user });
});

app.get('/login', function (req, res) {
  res.render('login', { user: req.user });
});


app.get('/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true,
  })
);

app.get(
  '/callback',
  passport.authenticate('spotify', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/')
});

app.listen(process.env.PORT, function () {
  console.log('App is listening on port ' + process.env.PORT);
});

