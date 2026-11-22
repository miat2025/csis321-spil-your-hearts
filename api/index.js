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

// ADD ADMIN AUTHENTICATION LATER
app.get("/admin", (req, res) => {
    res.sendFile(__dirname + '/private/admin/index.html');
});
app.get("/admin/:page", (req, res) => {
	res.sendFile(path.join(__dirname, "private/admin", `${req.params.page}.html`))
});
app.use("/admin/css", express.static(path.join(__dirname, "private/admin/css")));
app.use("/admin/js", express.static(path.join(__dirname, "private/admin/js")));

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

// 

app.listen(3003, () => console.log("listening on port 3003"))