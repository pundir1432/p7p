const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db.config");
const cors = require("cors");
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/upload", express.static("upload"));
// app.use(routes);
require("./routes/index")(app)

const port = process.env.PORT;
const host = process.env.HOST;
app.listen(port, () => {
    console.log(`app is running on ${host}${port}`)
});