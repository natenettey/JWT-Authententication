const express = require("express")
const bodyparser = require("body-parser")
const path = require("path")
const app=express()
const PORT = 5000

app.set("view engine", "ejs")
app.use("/css", express.static(path.resolve(__dirname,"assets/css")))

app.get("/", (req, res)=>{
    res.render("index")
})
app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`))