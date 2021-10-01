// General app program

// https://sequelize.org/master/manual/model-querying-basics.html#simple-update-queries
// Use Sequilize to create a CRUD app for a database

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const app = express();
const server = http.createServer(app);
app.use(express.json());
var router = express.Router();
const cors = require('cors');
app.use(cors());

// Requirements for Sequelize
const { Sequelize, Model, DataTypes } = require('sequelize');
const { User } = require('./models');

// Enforce table names to be the same as model names
const sequelize = new Sequelize('sqlite::memory:', {
  define: { freezeTableName: true}
});

// Create router for other pages page
var login = require('./routes/login.js');
app.use('/login', login);



// TODO: Make route sub-folder for multiple tables
// Routes for other data information, locates the folders
// var indexRouter = require('./routes/index.js');
// var loginRouter = require('./login.js');
// const postsRouter = require('./routes/posts.js');

// Shorthand for routes, tells what route VS Code to use
// app.use('/', indexRouter);
// app.use('/api/v1/login', loginRouter);
// app.get(loginRouter, '/checkpassword')

// Hello World
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// CREATE new user in the user table
app.post('/users', async (req, res) => {
  // req.body contains an Object with firstName, lastName, email
  const { firstName, lastName, email, country, hash } = req.body;
  const newUser = await User.create({ // Pass info through postman
    firstName: req.body.firstName, 
    lastName: req.body.lastName,
    email: req.body.email,
    country: req.body.country,
    hash: req.body.hash
  });

  // Send back the new user's ID in the response:
  res.json({
      id: newUser.id
  });
})

// READ all Users
app.get('/users', async (req, res) => {
  res.setHeader("Content-Type","application/json");
  const allUsers = await User.findAll();
  res.status(200).send(allUsers);
});

// Read user by ID
app.get('/users/:id', async (req, res) => {
  try{
      const oneUser = await User.findByPk(req.params.id);
      res.json(oneUser);
  } catch (e) {
      console.log(e);
      res.status(404).json({
          message: 'User id not found'
      });
  }
});

// Update user information
app.put('/users/:id', async (req, res) => {
    const {id} = req.params;
    const userFound = await User.findByPk(id);
    // Check that user exists in the database
    if (userFound === null) {
      console.log('User id not found');
      res.status(400).json({message: "User id doesn't exist in database"});
    } else {
      // Assemble paramaters from ones that exist in the request
      const updatedUser = await User.update(req.body, {where: {id} });
      res.json(updatedUser);
    };
});

app.delete('/users/:id', async (req, res) => {
  const {id} = req.params;
  // Check that user exists in the database
  const oneUser = await User.findByPk(id);
  // If not found return "User id does not exist within database"
  if (oneUser === null) {
    console.log('User not found');
    res.status(400).json('User not found');
  } else {
  // If found then delete
    const deletedUser = await User.destroy({ where: {id} });
    console.log('User deleted');
    res.json(deletedUser);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// TODO: Update code from clsas to match our project
// TODO: checkLogin(login, password) {}

// Routing for login/registration page
// Login in page
    // Check database information
    // If matches, then procceed to main
    // If false

// Check username & database exist in the database
//  If no username or password exist in database
//      grab user input from fields, check against database
//      error 401 -> "That account does not exist, enter a different acount name"
//  If username & password don't match database records
//      error 401 -> "Incorrect Username or Password"
//  If so, do they match?
//      If Yes to both, then get access to the website
//      Redirect to main page

// Registration Page
// TODO: registration() {}
//  When user hits submit, update information into the database records
//      Check that username doesn't conflict with existing username
//      If conflict exists, prevent database from updating
//          Return error code 400, "User name already exists"
//  If successfully updated, return message 201(?) that registration was successful
//      Redirect to main page

// Hash password function, return as object to update database

// Check username and password exist in database
//  Check bcrypt hash password matches one in the database
//  Check that username matches one in database
//      If true, then return true