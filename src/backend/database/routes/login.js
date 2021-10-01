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
const { User } = require('./models');

// Enforce table names to be the same as model names
const sequelize = new Sequelize('sqlite::memory:', {
  define: { freezeTableName: true}
});

// Check email and password match user submitted data
router.post('/verify', async (req, res) => {
  console.log(req.body);
  const bodyEmail = req.body.email;
  // TODO:  make case insensitive 
  await User.findOne({where: { email: bodyEmail } }).then (foundUser => {
    // If user exists and hash matches database
    // console.log('DEBUG',foundUser.id, foundUser.email, foundUser.hash);
    if (foundUser !== null) { // If user exist in the database
      if (foundUser.hash === req.body.password) { // If password matches the database 

        console.log('reached conditional');
        res.status(200).send({message : 'Login sucessful!'});
      } else { // 
        res.status(401).send({message: 'Username or password incorrect'})
      }
    } else {
      res.status(400).send({message: 'User does not exist'})
    }
  });
});
      
    

router.post('/', function(req, res){
  res.send('POST route on things.');
});

//export this router to use in our index.js
module.exports = router;