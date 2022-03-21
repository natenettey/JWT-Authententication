const express = require("express")
const dotenv = require("dotenv")
const bodyparser = require("body-parser")
const path = require("path")
const userModel = require('./model/user_model')
const bcrypt = require('bcryptjs')
const connect_db  = require('./database/connection')
const { status } = require("express/lib/response")
const jwt  = require ("jsonwebtoken")
const JWT_SECRET ="sdgsdfdvvsv%^$^%@#%^$&*&^%%^utfugvfujuihJ:>?>?>?<>}{}{p)_)_*(&^#$$%cgfvghv"



//setup express and dotenv
const app=express()
dotenv.config({path:"config.env"})
const PORT = 5000

//db connection
connect_db()

//body parser
app.use (bodyparser.json())

//set view engine
app.set("view engine", "ejs")

//setup paths for static assests and files
app.use("/css", express.static(path.resolve(__dirname,"assets/css/")))
app.use("/js", express.static(path.resolve(__dirname,"assets/js/")) )


//render the registration page on page load
app.get("/", (req, res)=>{
    res.render("index") 
})

//logic for registration page
app.post("/api/register", async(req,res)=>{
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
})



//render login page
app.get("/login", (req, res)=>{
    res.render("login")
})

//logic for login page
app.post('/api/login', async(req, res)=>{
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
})

app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`))