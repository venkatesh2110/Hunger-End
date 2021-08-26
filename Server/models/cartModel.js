const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartDetails = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId , ref : 'user',
        required:true
    },
    name : {
        type:String
    },
 array : [{ 
    
        id:{
            type:String
        },
        
        foodName:{
            type:String
        },
        
        price:{
            type:Number
        },
        count:{
            type:Number
        },
        amount:{
            type:Number
        }
 }],
 totalAmount:{
     type:Number
 }
});

module.exports = mongoose.model('cart',cartDetails);
