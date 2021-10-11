
// Routing for Adulting Overflow
const http = require('http');
const hostname = '127.0.0.1';
const port = process.env.port || 8000;
const express = require('express');
const app = express();
app.use(express.static('public')) // Use express static to serve static files to the user
const server = http.createServer(app);
app.use(express.json());
var router = express.Router();
const cors = require('cors');
app.use(cors());
app.set('view engine', 'html');

// Requirements for Sequelize
const { Sequelize, Model, DataTypes } = require('sequelize');
const { User } = require('./models');

// Enforce table names to be the same as model names
const sequelize = new Sequelize('sqlite::memory:', {
  define: { freezeTableName: true}
});

// Way to start the server on Heroku
app.listen(process.env.PORT || 8000, () => console.log("Server is running..."));

// Middleware & Security
const morgan = require('morgan');
const logger = morgan('tiny');
app.use(logger);
const helmet = require('helmet');
app.use(helmet());

app.all('*', (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Create router for other pages page
var login = require('./src/public/routes/login.js');
app.use('/login', login);



// Route to main page if user clicks on the main route of the site
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: 'index.html'});
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
    if (userFound === null) {  // If the user doesn't exist
      console.log('User id not found');
      res.status(400).json({message: "User id doesn't exist in database"});
    } else {
      // Assemble paramaters from ones that exist in the request
      const updatedUser = await User.update(req.body, {where: {id} });
      res.json(updatedUser);
    };
});

// Delete user from the database
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

/*
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/