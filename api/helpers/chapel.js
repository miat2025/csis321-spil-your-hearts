/**
 * Chapel database fetching
 */

const db = require("../db.js");

/**
 * Get the next set of 5 chapel dates
 * @returns Object of database data
 */
async function getNextDates(){
    // create query
    let query = `
    SELECT 
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
    ORDER BY date 
    ASC LIMIT 5;`

    // select
    let result = (await db.pgGetPool().query(query)).rows
    return result
}

async function getNextDatesExt(){
    // create query
    let query = `
    SELECT 
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
    ORDER BY date 
    ASC LIMIT 10;`

    // select
    let result = (await db.pgGetPool().query(query)).rows
    return result
}

module.exports = {
    getNextDates,
    getNextDatesExt
}
