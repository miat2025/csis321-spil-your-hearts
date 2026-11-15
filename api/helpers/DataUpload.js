// TODO Make a class to upload data to the database

const db = require('../db.js')
const csv_parse = require("../helpers/data_parse.js")
const csv_placeholder = require("../helpers/placeholder.js")

class DataUpload {

    // set with all suported tables
    static TABLES = new Set([
        "people",
        "location",
        //"event", -- for later
        "series",
        "chapel_title"
    ]);

    // constructor
    constructor (table, file_location) {
       this.table_name = table ;
       this.file_location = file_location;
    }

    parse_data(data_array){
        // verify correct minimum header/columns

        // get the headers to string

        // get the placeholders

        // build final query string

        // clean the insertable data

        // return string query, final insertable data
    }

    // 
    main_upload() {
        ;
    }
}
