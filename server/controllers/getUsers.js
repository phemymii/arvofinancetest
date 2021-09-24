const User = require('../models/userModel');

// const getUsers = async (req, res, next) => {
//     const users = await User.find({});
//     res.status(200).json({
//      data: users
//     });
//    }
    
const getUsers = async (req, res, next) => {
    try {
     const userId = req.params.adminId;
     const user = await User.findById(userId);
     if (!user) return next(new Error('User does not exist'));
      res.status(200).json({
      data: user
     });
    } catch (error) {
     next(error)
    }
   }

//  module.exports = getUser
 module.exports = getUsers