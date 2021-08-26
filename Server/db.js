const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin-venkatesh:venkatesh2000@cluster0.crogf.mongodb.net/HungerEnd?retryWrites=true&w=majority',{ useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify:false },(err) => {
    if(!err){
        console.log('Database Connected');
    }
    else{
        console.log('Errpr while connecting'+err);
    }
});

module.exports = mongoose;