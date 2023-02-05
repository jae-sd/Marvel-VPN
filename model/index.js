const mongoose = require("mongoose")


const data = new mongoose.Schema({
    paymentStatus: String
})

const Data = mongoose.model("data", data);
module.exports = Data;