const express = require("express")
const bodyparser = require("body-parser")
const path = require("path")
const app=express()
const PORT = 5000

app.get("/", (req, res)=>{
    res.render()
})
app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`))