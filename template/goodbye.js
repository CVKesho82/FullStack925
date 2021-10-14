const http = require ('http');
const express = require ('express');
const {checl,validationResult} = require ('express-validator');
const appserver = express();
appserver.engine('html','templateEngine');
appserver.set('views','templates');
appserver.set('view engine','html')

app.get('/goodbye', function(req,res){
    res.sendFile(__dirname + '/templates/goodbye.html');
  });