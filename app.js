const express = require("express")
const dotenv = require("dotenv")
const bodyparser = require("body-parser")
const path = require("path")
const connect_db  = require('./database/connection')


//setup express and bodyParser
const app=express()
dotenv.config({path:"config.env"})
const PORT = 5000
connect_db()
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
app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`))