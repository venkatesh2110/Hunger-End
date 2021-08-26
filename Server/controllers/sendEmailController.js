const express = require('express');
const router = express.Router();
const rn = require('random-number');
const nodeMailer = require('nodemailer');
var val;
router.post('/',(req,res) => {
    let user = req.body;
    sendMail(user,info => {
        if(info.response){
            res.send(val);
        }
    })
});

async function sendMail(user,cb){
    try{
        let transporter = nodeMailer.createTransport({
            host:'smtp.gmail.com',
            port:465,
            secure:true,
            auth:{
                user:'hungerend123@gmail.com',
                pass:'HungerEnd2021'
            }
        });

        var gen = rn.generator({
            min:  100000
          , max:  999999
          , integer: true
          });
    
        let options = {
            from:"hungerend123@gmail.com",
            to:user.emailId,
            subject:'OTP',
            text:`${gen()}`
        };
        val = options.text;
        let info = await transporter.sendMail(options);
    
        cb(info);
    }
    catch(err){
        console.log(err);
    }
}

module.exports = router;