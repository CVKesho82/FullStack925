const http = require('http');

const hostname = 'ec2-52-86-123-180.compute-1.amazonaws.com';
const port = '5432';//can be whatever you like

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

//-------------------------QUESTIONS GET ROUTE (working get route) ----------------------//

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

//------------------------------QUESTION PUT ROUTE (working PUT)-----------------------//
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

//-------------------------------SUBMIT Question function (working)------------------------------//
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

//----------------------------------QUESTION DELETE (working route)-------------------------//

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

//----------------------------ANSWERS GET ROUTE (working get route)--------------------------//
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

//---------------------------WORKING SUBMIT ANSWER FUNCTION (working)-----------------------//


function submitAnswer(){
  fetch('http://127.0.0.1:4000/Answers',{
    method:"POST",
    headers:{ 'Accept':'application/json','Content-Type': 'application/json'},
    body:JSON.stringify(
      {answer:document.getElementById('answer').value})
  })
    .then (res => res.json())
    .then (data => console.log(data))
    .catch(function (err) {
        // console.log('wrong', err);
    });
   }


//---------------------------------ANSWER PUT ROUTE (working)---------------------------------//
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

//----------------------------------ANSWER DELETE (working)------------------------------------//
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



    






