/**
 * This file will parse any data into the database
 * Must be ran in csv_parser directory
 * 
 * format:
 * <table_name> <file.csv>
 */

const db = require('../db.js')
const csv_parse = require("./data_parse.js")
const fs = require('fs')

// read command line args

function main() {
    // check if argument count is correct
    if (process.argv.length != 2) {
        console.error('Invalid number of elements!')
        process.exit(1)
    }

    // set our variables
    let table_name = process.argv[0];
    let file_name = process.argv[1];

    // get data from csv
    let data_array = csv_parse.default(file_name);

    
    // generate our insert

    // insert to database
}

main();