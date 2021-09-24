const Club = require('../models/Club');

const addClub = async (req, res, next) => {
 try {
  const {name, adminId } = req.body    
  console.log(name, adminId);
  const newClub = new Club({ name, adminId });
    await newClub.save();
    return res.json({ data: newClub })
 } catch (error) {
  next(error)
 }
}

module.exports = addClub