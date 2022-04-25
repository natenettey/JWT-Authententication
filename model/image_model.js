const mongoose = require('mongoose')

//create schema for image upload
const schema = new mongoose.Schema(
    {
        image:{data: Buffer, contentType:String}
    }
)
const Image_schema = new mongoose.model("Image", schema)
module.exports  = Image_schema