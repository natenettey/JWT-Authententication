const express = require("express")
const dotenv = require("dotenv")
const bodyparser = require("body-parser")
const path = require("path")
const userModel = require('./model/user_model')
const bcrypt = require('bcryptjs')
const connect_db  = require('./database/connection')


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
app.use("/css", express.static(path.resolve(__dirname,"assets/css")))
app.use("/js", express.static(path.resolve(__dirname,"assets/js/")) )


//render the registration page on page load
app.get("/", (req, res)=>{
    res.render("index") 
})

app.post("/api/register", async(req,res)=>{
    console.log(req.body)
   const {username, mail, residence, password:plainTextPassword} = req.body

   //hash the password
   const password = await bcrypt.hash(plainTextPassword, 10)
   console.log(password)
  
})
app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`))