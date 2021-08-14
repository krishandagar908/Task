var express = require("express");
let bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const csv = require("csvtojson");

const csvFilePath = "./Data.csv";

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());

app.get("/chart", async (req, res) => {
  const jsonArray = await csv().fromFile(csvFilePath);
  const type = req.params.type || "A";

  let data = jsonArray.map((_) => ({
    month: _.Month,
    type: _.Type,
    number: _.Number,
  }));

  res.json({ data: data });
});

app.listen(3001);
console.log("listening at 3001");
