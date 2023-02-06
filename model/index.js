const mongoose = require("mongoose")


const data = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true
    },
    paymentStatus: String
})


const Data = mongoose.model("data", data);
module.exports = Data;