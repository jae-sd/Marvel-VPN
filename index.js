require("dotenv").config();
const DB = require("./config/index")((error) => {
  if (error) return console.log(error)
  console.log("Connected to DB")
})

const express = require("express")
const app = express()
const bodyParser = require("body-parser")

const User = require("./model/index")
const PORT = process.env.PORT || 3005;

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.status(200).send({ message: "Server is ok" })
})


//Client route to get status of Marvel's payment
app.get("/get-status", async (req, res) => {

  try {
    const readDb = await User.find()
    if (!readDb) return res.status(400).send({ message: "Db Error" })

    res.status(200).send(readDb)
  } catch (error) {
    res.status(400).send(error)
  }


})

//Admin route to post the status of Marvel's payment
app.post("/post-status", async (req, res) => {
  const { value } = req.body


  try {
    const exists = await User.find()
 
    if (exists.length !== 0) {
      const setData = await User.updateOne({
        _id: exists[0]._id
      }, {
        paymentStatus: value
      })
      return res.status(200).send(setData)
    }

   //this is an upsert operation
    const setData = await User.create({
      paymentStatus: value
    })

    return res.status(200).send(setData)
  } catch (error) {
    res.status(400).send(error)
  }

})



app.delete("/delete", async (req, res) => {
  const { id } = req.body;

  try {
    const deleteKey = await User.deleteOne({
      _id: id
    })

    if (!deleteKey) return res.status(400).send({ message: "DB Delete Error" })
    res.status(200).send(deleteKey)
  } catch (error) {
    res.status(400).send(error)
  }

})


app.listen(PORT, () => console.log(`Server started`))