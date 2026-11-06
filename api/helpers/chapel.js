/**
 * Chapel database fetching
 */

const db = require("../db.js");

/**
 * Get the next set of 5 chapel dates
 * @returns Object of database data
 */
async function getNextDates(){
    const sample = [
        {date: "10/26/2026", time:"12:00 PM", credit_type:"Elective Credit", name:"Theology Club"},
        {date: "11/4/2026", time:"11:00 AM", credit_type:"Elective Credit", name:"Quaker Worship"},
        {date: "11/4/2026", time:"5:00 PM", credit_type:"Elective Credit", name:"Honor's Evening Prayer"},
        {date: "11/4/2026", time:"7:30 PM", credit_type:"Chapel Credit", name:"Be With"},
        {date: "11/5/2026", time:"10:50 AM", credit_type:"Chapel Credit", name:"Be Renewed"}
    ]
    return sample
}

async function getNextDatesExt(){
    const sample = [
        {date: "10/26/2026", time:"12:00 PM", credit_type:"Elective Credit", name:"Theology Club"},
        {date: "11/4/2026", time:"11:00 AM", credit_type:"Elective Credit", name:"Quaker Worship"},
        {date: "11/4/2026", time:"5:00 PM", credit_type:"Elective Credit", name:"Honor's Evening Prayer"},
        {date: "11/4/2026", time:"7:30 PM", credit_type:"Chapel Credit", name:"Be With"},
        {date: "11/5/2026", time:"10:50 AM", credit_type:"Chapel Credit", name:"Be Renewed"},
        {date: "10/26/2026", time:"12:00 PM", credit_type:"Elective Credit", name:"Theology Club"},
        {date: "11/4/2026", time:"11:00 AM", credit_type:"Elective Credit", name:"Quaker Worship"},
        {date: "11/4/2026", time:"5:00 PM", credit_type:"Elective Credit", name:"Honor's Evening Prayer"},
        {date: "11/4/2026", time:"7:30 PM", credit_type:"Chapel Credit", name:"Be With"},
        {date: "11/5/2026", time:"10:50 AM", credit_type:"Chapel Credit", name:"Be Renewed"}
    ]
    return sample
}

module.exports = {
    getNextDates,
    getNextDatesExt
}
