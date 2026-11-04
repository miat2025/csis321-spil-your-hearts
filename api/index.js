/**
 * This is the main file that will be running to the world
 */
const express = require('express');
const app = express();
const cors = require("cors"); //this is a library to config easily cors
const path = require('node:path');

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
});

// get chapel related info
app.get("/chapels/:get", async (req, res) => {
    // get will be the command
    const {get} = req.params 
    const o = await m.chapelResults(get)
    console.log(o)

    res.status(200).json(o)
});
app.get("/speakers/:get", async (req, res) => {
    res.status(200).json(["ok"])
})

// ADD ADMIN AUTHENTICATION LATER
app.use("/private/css", express.static(path.join(__dirname, "private/css")));
app.use("/private/js", express.static(path.join(__dirname, "private/js")));

app.listen(3003, () => console.log("listening on port 3003"))