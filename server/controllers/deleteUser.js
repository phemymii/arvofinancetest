const User = require('../models/userModel');

 const deleteUser = async (req, res, next) => {
   console.log(req.body);
    try {
     const memberId = req.body.id;
     await User.findOneAndUpdate(memberId);
     res.status(200).json({
      data: null,
      message: 'User has been deleted'
     });
    } catch (error) {
     next(error)
    }
   }

 module.exports = deleteUser