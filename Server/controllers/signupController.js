const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./../models/userDetailsModel');

router.post('/' , (req,res) => {
    const userData = req.body;
    const emailId = req.body.emailId;
    const userDetails = new User(userData);
    User.findOne({emailId:emailId},(err,user)=>{
        if(user){
            res.status(400).send('User Already Registered');
        }
        else if(!user){
            userDetails.save((err,doc) => {
                if(err) {
                    console.log(err);
                }
                else{
                    let payload = {subject:doc._id}
                    let token = jwt.sign(payload,'secretKey');
                    res.status(200).send({
                        id:doc._id,
                        token:token
                    });
                }
            })
        }
    })
    
});

module.exports = router;