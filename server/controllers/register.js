const User = require('../models/userModel');
const Club = require('../models/Club');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();
const client = require('../db')

async function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(password, salt)
}

const register = async (req, res, next) => {
 try {
  const {name, email, password, cpassword, role } = req.body
  const { _id } = req.query
    if(password !== cpassword){
        return res.json({error:{msg: 'Passwords do not match'}})
    }
  
//   const user = await User.findOne({ email });
//     if (user) return res.json({error:{msg: 'Email already exist. Log in'}});
  const hashedPassword = await hashPassword(password);
  
//   const newUser = new User({ name, email, password: hashedPassword});
await client.query("DROP TABLE IF EXISTS users");
await client.query("CREATE TABLE IF NOT EXISTS users(name varchar(64), email varchar(64), password varchar(255))");
 const newUser = await client.query("INSERT INTO users(name, email, password) VALUES",[name, email, hashedPassword]);
  const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWTPASS, {
   expiresIn: "1d"
  });
 
  console.log(newUser);
  newUser.accessToken = accessToken;
    await newUser.save();
    return res.json({ data: newUser, accessToken })
 } catch (error) {
  next(error)
 }
}

module.exports = register