const mongoose = require('mongoose')

//create new schema for registration page
const schema = new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    residence:{type:String, required:true},
    password:{type:String, required:true},
    
})

const User_model = mongoose.model("user_model", schema)
module.exports = User_model