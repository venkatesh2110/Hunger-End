const express = require('express');
const router = express.Router();
const verifyToken = require('./../middleware');
const Restuarant = require('./../models/restuatantModel');

router.post('/' , (req,res) => {
    const restuarantDetails = req.body;
    const restuarantItems = new Restuarant(restuarantDetails);
    restuarantItems.save((err,doc) => {
        if(err){
            console.log(err);
        }
        else{
            res.status(200).send(doc);
        }
    })
});

router.get('/', verifyToken, (req,res) => {
    Restuarant.find((err,doc) => {
        if(err){
            console.log(err);
        }
        else{
            res.status(200).send(doc);
        }
    })
});

router.get('/:id',verifyToken,async (req,res) => {
    const productDetails = await Restuarant.findById(req.params.id);
    if(productDetails){
        res.status(200).send({productDetails});
    }
    else{
        res.status(500).send('Error While Getting Product By Id');
    }
})

router.delete('/:id',async (req,res) => {
    const productDetails = await Restuarant.findByIdAndRemove(req.params.id);
    if(productDetails){
        res.status(200).send(productDetails);
    }
});

router.put('/:id',async (req,res) => {
    const params = req.params.id;
    const itemDetails = req.body;
    if(req.body.name){
        const restaurantItems = await Restuarant.findByIdAndUpdate(params,{$set:itemDetails},{new:true});
        if(restaurantItems){
            res.status(200).send(restaurantItems);
        }
        else{
            console.log('Error While Updating');
        }
    }
    else{
        const restaurantItems = await Restuarant.findByIdAndUpdate(params,{$push:itemDetails},{new:true});
        if(restaurantItems){
            res.status(200).send(restaurantItems);
        }
        else{
            console.log('Error While Updating');
        }
    }
});


module.exports = router;