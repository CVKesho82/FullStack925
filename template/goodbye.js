const http = require ('http');
const express = require ('express');
const {check,validationResult} = require ('express-validator');
const appserver = express();

app.get('/users/:id', async (req, res) => {
    try{
        const oneUser = await User.findByPk(req.params.id);
        res.render('goodbye',{
            locals:{
                oneUser
            }
        });
        res.status(200).send(htmlString);
    } catch (e) {
        console.log(e);
        res.status(404).json({
            message: 'User id not found'
        });
    }
  });