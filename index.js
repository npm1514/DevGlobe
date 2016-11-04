//////requirements//////
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var session = require('express-session');


//////files///////
var passport = require('./services/passport.js');
var userCtrl = require('./controllers/userCtrl.js');
var financeCtrl = require('./controllers/financeCtrl.js');
var cohortCtrl = require('./controllers/cohortCtrl.js');
var studentCtrl = require('./controllers/studentCtrl.js');


/////
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: "banana",
    resave: true,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/DevGlobe", function(err) {
  if(err) throw err;
});

mongoose.connection.once('open', function(){
  console.log('successfully connected to mongodb');
});

//////////////Endpoints///////////////


//user//
app.post('/api/user', function(req, res, next) {
  console.log('running endpoint');
  next();
},userCtrl.addUser); //makes new user
app.get('/api/user', userCtrl.getUser); //
app.get('/api/getCurrentUser', userCtrl.getCurrentUser);
//current user , goes to user controller, res.send(req.user) sends back current user
    //call endpoint in resolve

//login//
app.post('/api/login', passport.authenticate( 'local-auth', {
  successRedirect: '/api/getCurrentUser'
  }
));
//logout//
app.get('/api/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send("logged out");
});

/////////FINANCIALS/////////
app.post('/api/finance', financeCtrl.create);
app.get('/api/finance', financeCtrl.read);
app.put('/api/finance/:id', financeCtrl.update);
app.delete('/api/finance/:id', financeCtrl.delete);


//cohort//
app.post('/api/cohort', cohortCtrl.addCohort);
app.get('/api/cohort', cohortCtrl.retreive);
app.delete('/api/cohort/:id', cohortCtrl.remove);
app.put('/api/cohort/:id', cohortCtrl.update);

//student//
app.post('/api/student', studentCtrl.addStudent);
app.get('/api/student', studentCtrl.retreive);
app.delete('/api/student/:id', studentCtrl.remove);


app.listen(port, function() {
  console.log('now listening at port ' + port);
});
