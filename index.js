require("dotenv").config();
const DB = require("./config/index")
DB(() => {
  if(error) return error
})

const express = require("express")
const User = require("./model/index")
const PORT = 3005 || process.env.PORT;
const app = express()
const bodyParser = require("body-parser")



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {
	res.status(200).send({message: "Server is ok"})
})


//Client route to get status of Marvel's payment
app.get("/get-status", async (req, res) => {

  try {
    const readDb = await User.findOne({})
    if(!readDb) return res.status(400).send({ message: "Db Error"})

    res.status(200).send(setDb)
  } catch (error) {
    res.status(400).send({ message: error})
  }


})

//Admin route to post the status of Marvel's payment
app.post("/post-status", async (req, res) => {
  const { value } = req.body
  try {
    const setDb = await User.create({
      paymentStatus: value
    })
    if(!setDb) return res.status(400).send({ message: "Error saving Data"})

    res.status(200).send(setDb)
  } catch(error) {
    res.status(400).send({ message: error})
  }
})



app.delete("/delete", async (req, res) => {
  const { id } = req.body;

  try {
    const deleteKey = await User.deleteOne({
      _id: id
    })

    if(!deleteKey) return res.status(400).send({ message: "DB Delete Error"})
    res.status(200).send(deleteKey)
  } catch (error) {
    res.status(400).send({ message: error})
  }

})


app.listen(PORT, () => console.log(`Server started`))