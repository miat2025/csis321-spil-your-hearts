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

    let uploader = new DataUpload(table_name, file_name)
    
    uploader.main_upload();

    return;
    const data_array = csv_parse(file_name);
    if(!data_array) {
        // if something went wrong exit
        // csv_parse already prints error
        console.log("something went wrong")
        process.exit(1);
    }

    // get the first row of data
    // this results in the original updated without first row
    let header = data_array.shift();

    // get place holder string
    const placeholder = csv_placeholder(data_array);
    
    // generate our insert
    let insert_query = `
        INSERT into ${table_name} (${getColumns(header)})
        VALUES ${placeholder}
        ${conflict_people}
    `;   
    console.log(insert_query)
    // insert to database
}

/**
 * get the columns for a string
 * @param {Array} row csv array data
 * @returns string of head
 */
function getColumns(row){
    let result = []

    for (const col of row){
        console.log(col)
        result.push(col)
    }

    return result.join(',')
}

main();