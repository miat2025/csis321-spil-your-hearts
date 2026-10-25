const express = require('express');
const app = express();
const cors = require("cors"); //this is a library to config easily cors

app.use(express.json());
app.use(cors({ origin: true })); // enable origin cors

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3003, () => console.log("listening on port 3003"))