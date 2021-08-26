const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userDetails = new Schema({
    phoneNumber : 
    {
        type : Number
    },
    name : 
    {
        type : String
    },
    emailId : 
    {
        type : String
    },
    password : 
    {
        type : String
    }
});

module.exports = mongoose.model('userDetails',userDetails);