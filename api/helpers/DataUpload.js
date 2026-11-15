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
        // get the first row of data
        // this results in the original updated without first row
        let header = data.shift();

        // verify correct minimum header/columns

        // get the headers to string
        const headerStr = DataUpload.getColumns(header)

        // get the placeholders
        const placeholder = csv_placeholder(data);

        // build final query string
        let insert_query = this.createQuery(headerStr, placeholder) 

        // clean the insertable data

        // return string query, final insertable data
        return {insert_query, insert_data: data}
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

        console.log(insert_query, insert_data)
    }

    headerVerification(header) {
        return true
    }

    /**
     * Basic template for query insert
     * @param {String} headerStr The headers provided from data as a string
     * @param {String} placeholder string of psql placeholders. Ex ($1, $2)
     * @returns Query for db insert
     */
    createQuery(headerStr, placeholder) {
        return  `
            INSERT into ${this.table_name} (${headerStr})
            VALUES ${placeholder}
        `;  
    }

    /**
     * get the columns for a string
     * @param {Array} row csv array data
     * @returns string of headers
     */
    static getColumns(row){
        let result = []

        for (const col of row){
            result.push(col)
        }

        return result.join(',')
    }
}

const table_to_class = {
    "people": DataUpload,
    "location": DataUpload,
    "event": DataUpload,
    "series": DataUpload,
    "chapel_title": DataUpload
}

module.exports = table_to_class;
