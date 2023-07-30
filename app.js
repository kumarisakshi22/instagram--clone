const express = require("express");
const app = express()
const port = 5000;
const mongoose = require("mongoose")
const { mongoURL } = require("./keys")
const cors = require("cors")


app.use(cors())
require("./models/model")
require('./models/post')
app.use(express.json())
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"))
mongoose.connect(mongoURL)
mongoose.connection.on("connected", () => {
    console.log("succesfully connected to mongo");
})

mongoose.connection.on("error", () => {
    console.log("Not connected to mongo");
})

app.listen(port, () => {
    console.log("server is running at "+port);
})

