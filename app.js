const express = require("express")
const dotenv = require("dotenv")
const bodyparser = require("body-parser")
const path = require("path")
const userModel = require('./model/user_model')
const bcrypt = require('bcryptjs')
const connect_db  = require('./database/connection')
const { status } = require("express/lib/response")
const jwt  = require ("jsonwebtoken")
const multer  = require ('multer')
const imgModel = require('./model/image_model')
const fs = require('fs')
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
app.use("/images", express.static(path.resolve(__dirname,"assets/img/")))
//load routes
app.use('/', require('./server/routes/routes'))



//CONFIGURE MULTER FOR STORING FILE UPLOADS
const storage  = multer.diskStorage({
    destination:(req, file, cb)=>{ 
        //set the destination
        cb(null, 'uploads')
    },
    filename:(req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({storage:storage})


// the POST handler for processing the uploaded file
  
app.post('/api/upload', upload.single('image'), (req, res, next) => {
  
    var obj = {
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
             item.save();
            res.json({obj});
        }
    });
});

app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`))