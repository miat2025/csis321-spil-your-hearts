/**
 * This is the main file that will be running to the world
 */
const express = require('express');
const app = express();
const cors = require("cors"); //this is a library to config easily cors

const m = require('./main.js')

app.use(express.json());
app.use(cors({ origin: true })); // enable origin cors

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get("/test", async (req, res)=> {
    console.log("l")
    let o = await m.test();
    res.json(o);
})

app.listen(3003, () => console.log("listening on port 3003"))