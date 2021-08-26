const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restuarantDetails = new Schema({
    name : {
        type : String
    },
    about: {
        type : String
    },
    location : {
        type : String
    },
    Items : [{
        foodName : {
            type : String
        },
        price : {
            type : Number
        }
    }]
});

module.exports = mongoose.model('restuarant',restuarantDetails);