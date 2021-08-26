const express = require('express');
const router = express.Router();
const Restuarant = require('./../models/restuatantModel');

router.get('/', (req,res) => {
    Restuarant.find((err,doc) => {
        if(err){
            console.log(err);
        }
        else{
            res.status(200).send(doc);
        }
    })
});


router.get('/:id',async (req,res) => {
    const productDetails = await Restuarant.findById(req.params.id);
    if(productDetails){
        res.status(200).send({productDetails});
    }
    else{
        res.status(500).send('Error While Getting Product By Id');
    }
});

module.exports = router;