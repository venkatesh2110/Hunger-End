const express = require('express');
const router = express.Router();
const verifyToken = require('./../middleware');
const Cart = require('./../models/cartModel');

router.post('/',(req,res)=>{
    const cartItems = new Cart(req.body);
    cartItems.save((err,doc)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(doc);
        }
    })
});


router.get('/',verifyToken,(req,res)=>{
    Cart.find((err,doc)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(doc);
        }
    })
})

router.get('/:id',verifyToken,(req,res) => {
    const params = req.params;
    Cart.findOne({userId:params.id},(err,item)=>{
        if(err){
            console.log(err);
        }
        else if(!item){
            res.status(500).send('Your Cart Is Empty!');
        }
        else{
            res.status(200).send({item});
        }
    })
});

router.put('/:id', async (req,res)=>{
    const params = req.params.id;
    const cartDetails = req.body;
    const cartItems = await Cart.findByIdAndUpdate(params,{$set:cartDetails},{new:true});
    if(cartItems){
        res.status(200).send(cartItems);
    }else{
        console.log('Error While Updating');
    }
});

router.delete('/:id',async (req,res) => {
    const params = req.params.id;
    const deleteProduct = await Cart.findByIdAndDelete(params);
    if(deleteProduct){
        res.send(deleteProduct);
    }
})

module.exports = router;