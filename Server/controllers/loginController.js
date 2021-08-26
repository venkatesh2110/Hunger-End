const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('./../models/userDetailsModel');

router.post('/', (req,res) => {
    const emailId = req.body.emailId;
    const password = req.body.password;
    User.findOne({emailId:emailId}, (err,user) => {
        if(err){
            console.log(err);
        }
        if(!user){
            res.status(401).send('Invalid Email');
        }
        else if(password !== user.password){
            res.status(401).send('Invalid Password');
        }
        else{
            let payload = {subject:user._id}
            let token = jwt.sign(payload,'secretKey');
            res.status(200).send({
                userid:user._id,
                token:token
            });
        }
    })
})


module.exports = router;