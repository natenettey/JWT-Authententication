const userModel = require('../model/user_model')
const bcrypt = require('bcryptjs')
const JWT_SECRET ="sdgsdfdvvsv%^$^%@#%^$&*&^%%^utfugvfujuihJ:>?>?>?<>}{}{p)_)_*(&^#$$%cgfvghv"
const jwt  = require ("jsonwebtoken")
const fs = require('fs')
const path = require("path")





//-------LOGIC FOR REGISTRATION PAGE---------
exports.register = async(req,res)=>{
    console.log(req.body)
   const {username, email, residence, password:plainTextPassword} = req.body

   //check if all inputs have been received
   if (!username || typeof username !== 'string'){
       res.json({error:"Invalid Username"})
   }else if(!email){
      res.json({error:"Please add an email address"})
   }else if(!residence){
    res.json({error:"Please add a residence"})
 }else if(!plainTextPassword){
    res.json({error:"Please add a password"})
 }

   //hash the password
   const password = await bcrypt.hash(plainTextPassword, 10)
   console.log(password, email) 

   //create new user
   try {
      const response =  await userModel.create({
           username,
           email,
           residence,
           password
       })
       console.log("User created", response)
   } catch (error) {
       console.log(error)// can use""error.message"
       if (error.code === 11000){
           return res.json({error:"Email already in use ! "})
       }
       throw error
   }
   res.json({status:'ok'})
}



//------LOGIC FOR LOGIN PAGE-------
exports.login = async(req, res)=>{
    const {email, password}  = req.body

    //get user with the passed email and password
    const user = await userModel.findOne({email}).lean()
    if(!user){
        res.json({status:"error", error:"Invalid username / password"})
    }

    //check if the passwords match
    if(await bcrypt.compare(password, user.password)){

        const token = jwt.sign(
            {
                id:user._id,
                username:user.username
            },JWT_SECRET
        )
        return res.json({status: "ok", data:token})
    }
    return res.json({status:"error", error:"Invalid username/password"})
}




