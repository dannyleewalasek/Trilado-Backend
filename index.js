var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());

app.get("/search", function (req, res) {
  console.log(req.params.id);
  res.send("hello world");
});

app.listen(3000);
