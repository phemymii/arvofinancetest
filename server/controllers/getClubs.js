const Club = require('../models/Club');
const User = require('../models/userModel');

// const getUsers = async (req, res, next) => {
//     const users = await User.find({});
//     res.status(200).json({
//      data: users
//     });
//    }
    
const getClubs = async (req, res, next) => {
    try {
    let members = [];
     const {adminId} = req.body;
     let clubs = await Club.findOne({adminId});
     if(clubs.members.length > 0){
         const users = await User.find({_id: clubs.members})
         members = (users)
     }
    //  if (!clubs) return next(new Error('User does not exist'));
     res.status(200).json({ clubs, members });
    } catch (error) {
     next(error)
    }
   }


//  module.exports = getUser
 module.exports = getClubs