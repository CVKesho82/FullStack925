// https://sequelize.org/master/manual/model-querying-basics.html#simple-update-queries
// Use Sequilize to create a CRUD app for a database

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
var router = express.Router();
const app = express();
const server = http.createServer(app);
app.use(express.json());

// Requirements for Sequelize
const { Sequelize, Model, DataTypes } = require('sequelize');
const { User } = require('../models');

// Enforce table names to be the same as model names
const sequelize = new Sequelize('sqlite::memory:', {
  define: { freezeTableName: true}
});

// Check email and password match user submitted data
router.post('/verify', async (req, res) => {
  console.log(req.body); // DEBUG
  const bodyEmail = req.body.email;
  await User.findOne({where: { email: bodyEmail } }).then (foundUser => { // Check email against database
    if (foundUser !== null) { // If user was found in the database
      if (foundUser.hash === req.body.password) { // If password matches the database 
        console.log('reached conditional');
        res.status(200).send({message : 'Login sucessful!'});
      } else { // 
        res.status(401).send({message: 'Username or password incorrect'});
      }
    } else {
      res.status(400).send({message: 'User does not exist'});
    }
  });
});

router.post('/register', async (req, res) => {
  console.log(req.body.password);
  const bodyEmail = req.body.email;
  await User.findOne({where: { email: bodyEmail } }).then (foundUser => { // Check email against database
    if (foundUser !== null) { // If user was found in the database
      console.log('user already exists');
      res.status(401).send({message: 'email already taken, please try another'});
    } else {
      console.log('DEBUG: email not registered');
      const newUser = User.create({ // Pass info through postman
          firstName: req.body.firstName, 
          lastName: req.body.lastName,
          email: req.body.email,
          hash: req.body.password});
        res.status(201).json({id: newUser.id, message: 'New User created!'});
      }
    });
  });

router.post('/', function(req, res) {
  res.send('POST route on things.');
});

//export this router to use in our index.js
module.exports = router;