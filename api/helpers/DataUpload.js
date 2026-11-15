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

    /**
     * Class constructor
     * @param {String} table name of db table
     * @param {String} file file to be uploaded
     */
    constructor (table, file) {
       this.table_name = table;
       this.file = file;
    }

    parse_data(data){
        // verify correct minimum header/columns

        // get the headers to string

        // get the placeholders

        // build final query string

        // clean the insertable data

        // return string query, final insertable data
        const insert_query = null;
        const insert_data = null;
        return {insert_query, insert_data}
    }

    /**
     * Heart and soul of what is to be uploaded.
     * Will throw errors when something is wrong.
     */
    main_upload() {
        // get data from csv
        const data_array = csv_parse(this.file);
        if(!data_array) {
            // if something went wrong exit
            // csv_parse already prints error
            throw new Error("something went wrong in parsing");
        }

        const { insert_query,insert_data} = this.parse_data(data_array);

        console.log(insert_data)
    }
}

module.exports = DataUpload;
