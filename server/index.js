
// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const User = require('./models/userModel')
const routes = require('./routes/route.js');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const client = require('./db')
require("dotenv").config({
 path: path.join(__dirname, "../.env")
});

const app = express();
app.use(bodyParser.json())
 app.use(cookieParser())
 

app.use(cors());
const PORT = process.env.PORT || 4000;


mongoose
 .connect('mongodb://localhost:27017/db')
 .then(() => {
  console.log('Connected to the Database successfully');
 });



 app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "https://localhost:3000");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, x-auth-token");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
	next();
});


 
app.use(async (req, res, next) => {
 if (req.headers["x-access-token"]) {
  const accessToken = req.headers["x-access-token"];
  const { userId, exp } =  jwt.verify(accessToken, process.env.JWTPASS);
  // this checks if token is expired
  if (exp < Date.now().valueOf() / 1000) { 
   return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
  } 
  res.locals.loggedInUser = await User.findById(userId); next(); 
 } else { 
  next(); 
 } 
});
 
app.use('/', routes); app.listen(PORT, () => {
  console.log('Server is listening on Port:', PORT)
})
