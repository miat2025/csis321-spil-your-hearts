// TODO Make a class to upload data to the database
// Make subclassed for the specific tables


const db = require('../db.js')
const csv_parse = require("../helpers/data_parse.js")
const csv_placeholder = require("../helpers/placeholder.js")

class DataUpload {
    static MAX_ARGV_LENGTH = 4;

    // set with all suported tables
    static TABLES = new Set([
        "people",
        "location",
        //"event", -- for later
        "series",
        "chapel_title"
    ])

    // constructor
    constructor (table, file_location) {
        
    }

    // argument validatity checker,
    // more checks to come later when needed
    validateCLIArgs(cli_args) {
        // will not implement an exit 
        // incase non-cli func to prevent live
        // api from ending if mistake occures

        // check length

        // return result
        return null
    }

    // function to run main
    cli_main_upload() {
        ;
    }

    // 
    main_upload() {
        ;
    }
}
