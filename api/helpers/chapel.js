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
    let query = `SELECT * FROM events WHERE date >= CURRENT_DATE ORDER BY date ASC LIMIT 5;`

    // select
    let result = (await db.pgGetPool().query(query)).rows
    return result
}

async function getNextDatesExt(){
    // create query
    let query = `SELECT * FROM events WHERE date >= CURRENT_DATE ORDER BY date ASC LIMIT 10;`
    
    // select
    let result = (await db.pgGetPool().query(query)).rows
    return result
}

module.exports = {
    getNextDates,
    getNextDatesExt
}
