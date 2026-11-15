/**
 * This file will parse any data into the database
 * 
 * format:
 * <table_name> <file.csv>
 * Ex:
 * node db_functions/main_parse.js people csv/people.csv
 */
const db = require('../db.js')
//const csv_parse = require("../helpers/data_parse.js")
//const csv_placeholder = require("../helpers/placeholder.js")
const DataUpload = require("../helpers/DataUpload.js")
const fs = require('fs')

const MAX_ARGV_LENGTH = 4;


// conflict items
let conflict_people = `
        ON CONFLICT (first_name, last_name)
        DO UPDATE SET
            first_name = EXCLUDED.first_name
            last_name = EXCLUDED.last_name
            email = EXCLUDED.email`

// read command line args

function main() {
    // check if argument count is correct
    console.log(process.argv)
    if (process.argv.length != MAX_ARGV_LENGTH) {
        console.error('Invalid number of elements!')
        process.exit(1)
    }

    // set our variables
    let table_name = process.argv[2];
    let file_name = process.argv[3];

    // get the object to perform job
    const jobClass = DataUpload[table_name];

    if (!jobClass){
        console.error(`${table_name} is not a valid table`)
    }

    // initialize uploader
    const uploader =  new jobClass(table_name, file_name);
    try {
        uploader.main_upload();
    }
    catch (e){
        console.error(e)
    }

    process.exit(0);
}



main();