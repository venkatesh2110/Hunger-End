const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConnection = require('./db');
const path = require('path');

const SignupDetails = require('./controllers/signupController');
const LoginDetails = require('./controllers/loginController');
const RestuarantDetails = require('./controllers/restuarantController');
const CartDetails = require('./controllers/cartController');
const SendEmailDetails = require('./controllers/sendEmailController');
const UserDetails = require('./controllers/getUserController');
const AdminRestaurant = require('./controllers/adminRestaurantController');

const port = process.env.PORT || 3000 ;

app.use(cors());
app.use(bodyParser.json());

app.use('/signup',SignupDetails);
app.use('/login',LoginDetails);
app.use('/restaurants',RestuarantDetails);
app.use('/cart',CartDetails);
app.use('/sendEmail',SendEmailDetails);
app.use('/userDetails',UserDetails);
app.use('/adminRestaurants',AdminRestaurant);


app.use(express.static(path.join(__dirname,'public')));

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'public/index.html'));
})

app.listen(port, () => console.log('Server is running at 3000'));