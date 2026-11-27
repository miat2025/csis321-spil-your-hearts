const express = require("express");
const db = require("../db.js");

// create router
const router = express.Router();


router.post("/event-speaker", async (req, res) => {
    // we are gonna list the new speaker set.
    const { speakers } = req.body;

    // remove what is on the db

    // add the new people

})

router.post("/event-host", async (req, res) => {
    // we are gonna list the new speaker set.
    const { host } = req.body;

    // remove what is on the db

    // add the new people

})

// export
module.exports = router;
