/**
 * This file is dedicating to running all functions 
 * used in route endpoints in index.js
 */

const db = require('./db.js')
const chapel = require('./helpers/chapel.js')

async function test(){
    // testing code
    try{
        console.log(process.env.DB_HOST, process.env.DB_PASSWORD)
        let t = await db.pgGetPool()
        let sql = `
            SELECT * FROM vehicle_positions LIMIT 10
        `
        let {rows} = await t.query(sql)

        console.log(rows)
        return rows
    }
    catch(e){
        console.error("something oofed", e)
    }
    
}

async function chapelResults(getRequest){
    switch(getRequest){
        case "next": return await chapel.getNextDates()
        default: return [null]; // if things are wrong
    }
}

module.exports = {
    test,
    chapelResults
}
