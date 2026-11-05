/**
 * This file will parse any data into the database
 * 
 * format:
 * <table_name> <file.csv>
 */
const db = require('../db.js')
const csv_parse = require("./../csv_parser/data_parse.js")
const fs = require('fs')

// read command line args

function main() {
    // check if argument count is correct
    console.log(process.argv)
    if (process.argv.length != 4) {
        console.error('Invalid number of elements!')
        process.exit(1)
    }

    // set our variables
    let table_name = process.argv[2];
    let file_name = process.argv[3];

    // get data from csv
    let data_array = csv_parse(file_name);
    if(!data_array) {
        // if something went wrong exit
        // csv_parse already prints error
        process.exit(1);
    }

    console.log(data_array)
    // generate our insert

    // insert to database
}

main();