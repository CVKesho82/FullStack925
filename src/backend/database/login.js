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
router.get('/verify', async (req, res) => {
    const foundUser = await User.findOne(req.body.email);
    if (foundUser === null) { // if user not found, 
      console.log('User does not exist');
    } else {
      // Verify user information matches the database
      if (foundUser.hash !== req.body.password) {
        res.status(200).send({message : 'Login sucessful!'});
      } else {
        console.log('Username or password incorrect')
      }
    }
});

router.post('/', function(req, res){
  res.send('POST route on things.');
});

//export this router to use in our index.js
module.exports = router;