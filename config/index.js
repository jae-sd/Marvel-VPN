const mongoose = require("mongoose")
require("dotenv").config()

let mongodbAtlas = `mongodb+srv://jae321:${process.env.DB_PASSWORD}@cluster0.gwvtatj.mongodb.net/test`;
let localConnection = "mongodb://localhost:27017/marvel";

const connectDb = async (cb) => {
    
    mongoose.set('strictQuery', true);
    mongoose.connect(mongodbAtlas,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(res => {
        return cb()
    }).catch(error => {
        return cb(error)
    })
}

module.exports = connectDb