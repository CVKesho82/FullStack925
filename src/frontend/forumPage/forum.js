const http = require('http');

const hostname = '127.0.0.1';
const port = '4000';//can be whatever you like

//Express
//const { hostname } = require('os');
const express = require('express');
const app = express();
const server = http.createServer(app);
const router = express.Router();

//Express-validator
const {check, validationResult } = require('express-validator');

//Sequlelize
const Sequelize = require('sequelize');
const { forumQuestions } = require('./models');

//Body Parser
const bodyParser = require('body-parser')

//Initate the server
server.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

//PG
const users = require("pg");
//const pgp = require("pg-promise")();
//const db = pgp("postgres://postgres:password@host:port/user");

//---------------------QUESTIONS GET ROUTE (working get route) -------------------//

app.use(express.json());
app.get('/forumQuestions', async (req, res) => {
  const questions = await forumQuestions.findAll();
  res.json(questions);
});

//------------------------QUESTIONS POST ROUTE (working post route)-----------------------//
app.use(express.json());
app.post('/forumQuestions', async(req,res) => {
  const {topic,question} =req.body;
  const newQuestion = await forumQuestions.create({
    topic,
    question
  });
})

//------------------------SUBMIT Question function------------------------------>
function newQuestion(){
fetch('http://127.0.0.1:4000/forumQuestions',{
  method:"POST",
  headers:{ 'Accept':'application/json','Content-Type': 'application/json'},
  body:JSON.stringify(
    {topic:document.getElementById('topic').value,
    text:document.getElementById('question').value})
})
  .then (res => res.json())
  .then (data => console.log(data))
  .catch(function (err) {
      console.log('wrong', err); // console.log the errors if any
  });
 }

//------------------------ANSWERS GET ROUTE (working get route)-----------------------------//
app.use(express.json());
app.get('/Answers', async (req, res) => {
  const answers = await Answers.findAll();
  res.json(answers);
});

//-------------------------ANSWER POST ROUTE (working post route)---------------------------//
app.use(express.json());
app.post('/Answers', async(req,res) => {
  const {answer} =req.body;
  console.log(req.body);
  const newAnswer = await Answers.create({
    answer
  });
})




    






