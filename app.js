const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Nexmo = require("nexmo");
const socketio = require("socket.io");
require("dotenv").config();
//Init APP
const app = express();

// Init nexmo

const nexmo = new Nexmo({
  apiKey: "9379f0d1",
  apiSecret: "9nHAXIOF8e5cltyw",
});

//Template Engine
app.set("view engine", "html");
app.engine("html", ejs.renderFile);

//Public Folder Setup
app.use(express.static(__dirname + "/public"));

//bode-Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index Route

app.get("/", (req, res) => {
  res.render("index");
});

//submit request
app.post("/", (req, res) => {
  //   res.send(req.body);
  //   console.log(req.body);
  const number = req.body.number;
  const text = req.body.text;

  nexmo.message.sendSms(
    "9994763414",
    number,
    text,
    { type: "unicode" },
    (err, resposedata) => {
      if (err) {
        console.log(err);
      } else {
        console.log(resposedata);
      }
    }
  );
});

//Define Port
const port = 3000;

//App Start
const server = app.listen(process.env.PORT, () =>
  console.log(`app Start with :: ${port}`)
);
