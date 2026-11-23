/**
 * This is a file to contain all backend programs.
 * and route them to their place
 */

const express = require("express");
const db = require("../db.js");

// define out router
const router = express.Router();

// use this router for updating
const beudRouter = require("./router_backend_update");
router.use("/ud", beudRouter);
router.get('/events', async (req, res)=>{
    //const settings = req.body;

     // create query
    let query = `
    SELECT 
        e.id,
        e.title,
        e.date,
        COALESCE(e.new_time_start, ct.time_start) AS time_start,
        COALESCE(e.new_time_end, ct.time_end) AS time_end,
        l.name AS location_name,
        l.code,
        s.name AS series_name,
        ct.credits,
        ct.title
    FROM events e
    JOIN location l 
        ON e.location_id = l.id
    JOIN chapel_title ct
        ON e.chapel_title_id = ct.id
    JOIN series s
        ON e.event_series_id = s.id
    WHERE date >= CURRENT_DATE 
    ORDER BY date;`

    // select
    let result = (await db.pgGetPool().query(query)).rows
    res.status(200).json(result);
})

// get a list of 
router.get('/people', async (req, res) => {
    let query = `SELECT id, last_name, first_name FROM people;`

    try{
        let people_data = (await db.pgGetPool().query(query)).rows
        res.status(200).json(people_data)
    }
    catch (e) {
        // on error return error
        res.status(500).json({status: "error", message: e})
    }
})

module.exports = router;
