const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();

async function validatePassword(plainPassword, hashedPassword) {
 return await bcrypt.compare(plainPassword, hashedPassword);
}

const login = async (req, res, next) => {
    console.log(req.body);
    try {
     const { email, password } = req.body;
     
     const user = await User.findOne({ email });
     if (!user) return res.json({error:{msg: 'Email does not exist'}});
     const validPassword = await validatePassword(password, user.password);
     if (!validPassword) return  res.json({error:{msg:'Password is not correct'}})
     const accessToken = jwt.sign({ userId: user._id }, process.env.JWTPASS, {
      expiresIn: "1d"
     });
     await User.findByIdAndUpdate(user._id, { accessToken })
     res.status(200).json({
      data: { email: user.email, name: user.name, id: user._id },
      accessToken
     })
    } catch (error) {
     next(error);
    }
   }

module.exports = login