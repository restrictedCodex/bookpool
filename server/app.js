require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser');


mongoose.connect(process.env.DATABASE, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("DB CONNECTED");
}).catch(()=>{
  console.log("DB GOT OPPS");
})


app.use();

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
