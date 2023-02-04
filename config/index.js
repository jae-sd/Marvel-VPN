const mongoose = require("mongoose")
require("dotenv").config()

const connectDb = async (cb) => {
    mongoose.set('strictQuery', true);
    mongoose.connect(`mongodb+srv://jae321:${process.env.DB_PASSWORD}@cluster0.gwvtatj.mongodb.net/test`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(res => {
        return res
    }).catch(error => {
        cb(error)
    })
}

module.exports = connectDb