const mongoose = require("mongoose")
require("dotenv").config()

const connectDb = async () => {
    mongoose.connect(`mongodb+srv://jae321:${process.env.DB_PASSWORD}@cluster0.gwvtatj.mongodb.net/test`).then(res => {
        return res
    }).catch(error => {
        return error
    })
}

module.exports = connectDb