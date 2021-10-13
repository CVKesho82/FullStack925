// Routing for Adulting Overflow

// https://sequelize.org/master/manual/model-querying-basics.html#simple-update-queries
// Use Sequilize to create a CRUD app for a database

const http = require('https');
const hostname = '127.0.0.1'; //cvk updated host name to heroku credentials
const port = process.env.PORT || 3000;

const express = require('express');
const app = express();
const server = http.createServer(app)
app.use(express.json());
var router = express.Router();
const cors = require('cors');
app.use(cors());
app.set('view engine', 'html');

// Requirements for Sequelize
const { Sequelize, Model, DataTypes } = require('sequelize');
const { User } = require('./database/models');
const { Answers } = require('./database/models');
const { forumQuestions } = require('./database/models');

//es6 engine
const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

// console log server running at a given port, Heroku or local
app.listen(port, hostname, () => { //cvk added hostname to this line. Was previously just referencing port
  console.log(`Server running at hostname:` + hostname ` ,and port` + port);
});

// Middleware 
const morgan = require('morgan');
const logger = morgan('tiny');
app.use(logger);

// Static Files use Template folder
app.use(express.static('template'))

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
   console.log(`${req.method} ${req.path}`);
  next();
});

// Security 
const helmet = require('helmet');
app.use(helmet());

// Create router for other pages page
var login = require('./database/routes/login.js');
app.use('/login', login);

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: './template/index.html'});
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


// Delete users
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

//-------------------------QUESTIONS GET ROUTE (working route to get all questions) ----------------------//

app.use(express.json());
app.get('/forumQuestions', async (req, res) => {
  const questions = await forumQuestions.findAll();
  res.json(questions);
});

//------------------------QUESTIONS POST ROUTE (working route to post new questions)-----------------------//
app.use(express.json());
app.post('/forumQuestions', async(req,res) => {
  const {topic,question} =req.body;
  const newQuestion = await forumQuestions.create({
    topic,
    question
  });
})

//------------------------------QUESTION PUT ROUTE (working route to update questions)-----------------------//
app.put('/forumQuestions/:id', async (req,res)=> {
  const {id} = req.params;
  const idFound = await forumQuestions.findByPk(id);
  if (idFound === null){
    console.log('Question id not found');
    res.status(400).json({message:"Question id doesn't exist in database"});
  }
  else {
    const updateQuestion = await forumQuestions.update(req.body,{where: {id}});
    res.json(updateQuestion);
  };
});

//-----------------------------QUESTION POST ROUTE (working route to delete questions)---------------------//

app.delete('/forumQuestions/:id', async (req,res)=> {
  const {id} = req.params;
  const oneQuestion = await forumQuestions.findByPk(id);
  if (oneQuestion === null){
    // console.log('Question id not found');
    res.status(400).json({message:"That question id doesn't exist in database"});
  }
  else {
    const deleteQuestion = await forumQuestions.destroy({where:{id}});
    // console.log('deleted');
    res.json(deleteQuestion);
  };
});

//----------------------------ANSWERS GET ROUTE (working route to get all answers)--------------------------//
app.use(express.json());
app.get('/Answers', async (req, res) => {
  const answers = await Answers.findAll();
  res.json(answers);
});

//-------------------------ANSWER POST ROUTE (working route to submit new answers)---------------------------//
app.use(express.json());
app.post('/Answers', async(req,res) => {
  const {answer} =req.body;
  console.log(req.body);
  const newAnswer = await Answers.create({
    answer
  });
})

//---------------------------------ANSWER PUT ROUTE (working route to update answers)---------------------------------//
app.put('/Answers/:id', async (req,res)=> {
  const {id} = req.params;
  const idFound = await Answers.findByPk(id);
  if (idFound === null){
    console.log('Answer id not found');
    res.status(400).json({message:"Question id doesn't exist in database"});
  }
  else {
    const updateAnswer = await Answers.update(req.body,{where: {id}});
    res.json(updateAnswer);
  };
});

//----------------------------------ANSWER DELETE (working route to delete answers)------------------------------------//
app.delete('/Answers/:id', async (req,res)=> {
  const {id} = req.params;
  const oneAnswer = await Answers.findByPk(id);
  if (oneAnswer === null){
    // console.log('Answer id not found');
    res.status(400).json({message:"That answer id doesn't exist in database"});
  }
  else {
    const deleteAnswer = await Answers.destroy({where: {id}});
    // console.log('Answer deleted');
    res.json(deleteAnswer);
  };
});
//------------------------------------ES6 Template Route (working route to populate ES6)--------------------------------//
app.get('/goodbye', function(req,res){
  res.sendFile(__dirname + '/templates/goodbye.html');
});



