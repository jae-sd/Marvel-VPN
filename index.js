require("dotenv").config();

const express = require("express")
const app = express()
const bodyParser = require("body-parser")

const DB = require("./config/index")((error) => {
  if (error) return console.log(error)
  console.log("....Connected to DB....")
  app.listen(PORT, () => console.log(`....Server started....`))
})

const User = require("./model/index")
const PORT = process.env.PORT || 3005;

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.status(200).send({ message: "Server is ok" })
})

app.get("/get-all", async (req, res) => {
  try {
    const allUsers = await User.find({})
    res.status(200).send(allUsers)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.get("/get-one", async (req, res) => {
  try {
    const { name } = req.body;
    const getOne = await User.findOne({ name })
    if (!getOne) return res.send({ message: "User does not exist" })

    res.status(200).send(getOne.paymentStatus)
  } catch (error) {
    res.status(400).send(error)
  }
})


app.post("/add-users", async (req, res) => {
  const { name, value } = req.body;

  try {
    const newUser = await User.updateOne({
      name
    }, {
      $set: {
        name,
        paymentStatus: value
      }
    }, {
      upsert: true
    })

    res.status(200).send(newUser)
  } catch (error) {
    res.status(200).send(error)
  }


})


app.post("/update-status", async (req, res) => {
  const { name, value } = req.body;

  const exists = await User.findOne({ name });
  if (!exists) return res.status(400).send({ message: "User does not exist" })

  try {
    const updatedUser = await User.updateOne({
      name
    }, {
      $set: {
        paymentStatus: value
      }
    })

    res.status(200).send(updatedUser)
  } catch (error) {
    res.status(400).send(error)
  }
})



app.delete("/delete-user", async (req, res) => {
  const { name } = req.body;

  const exists = await User.findOne({ name })
  if (!exists) return res.status(400).send({ message: "User does not exist" })

  try {

    const deleteUser = await User.deleteOne({ name })

    res.status(200).send(deleteUser)
  } catch (error) {
    res.status(400).send(error)
  }

})


