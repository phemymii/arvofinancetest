
// server/models/userModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const ClubSchema = new Schema({
name: {
  type: String,
  required: true,
 },
adminId: {
   type: String,
   required: true
 },
 members: {
     type: Array,
     default: []
 }
});
 
const Club = mongoose.model('club', ClubSchema);
 
module.exports = Club;