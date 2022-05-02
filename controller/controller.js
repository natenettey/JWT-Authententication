const userModel = require('../model/user_model')
const bcrypt = require('bcryptjs')


//LOGIC FOR REGISTRATION PAGE
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
// app.post("/api/register", )
