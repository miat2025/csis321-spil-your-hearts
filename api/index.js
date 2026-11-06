/**
 * This is the main file that will be running to the world
 */

// import packages
const express = require('express');
const app = express();
const cors = require("cors"); //this is a library to config easily cors
const path = require('node:path');

// importing required custom files
const m = require('./main.js')

// constant vars
const HELPER_DEST = './helpers'

app.use(express.json());
app.use(cors({ origin: true })); // enable origin cors

// main api backend page
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// testing route
app.get("/test", async (req, res)=> {
    console.log("l")
    let o = await m.test();
    res.json(o);
});

// chapel routers
const chapelRouter = require(HELPER_DEST + "/router_chapel").default
app.use("/chapels", chapelRouter)

// speaker routers
app.get("/speakers/:get", async (req, res) => {
    res.status(200).json(["ok"])
})

// ADD ADMIN AUTHENTICATION LATER
app.use("/private/css", express.static(path.join(__dirname, "private/css")));
app.use("/private/js", express.static(path.join(__dirname, "private/js")));

app.listen(3003, () => console.log("listening on port 3003"))