const User = require('../models/userModel');
const Club = require('../models/Club');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findOneAndUpdate } = require('../models/userModel');
require("dotenv").config();



const addMember = async (req, res, next) => {
  const user = res.locals.loggedInUser;
  console.log(user);
 try {
  const { _id } = req.query
  console.log(_id);
    if( _id ){
      const findClub = await Club.findOne({_id})
      console.log(findClub);
    if(findClub){
        const addMember = await Club.findOneAndUpdate({ _id }, {$push: {members: String(user._id)}});
     }
    }
    return res.json({ success: "l" })
 } catch (error) {
  next(error)
 }
}

module.exports = addMember