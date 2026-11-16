// TODO Make a class to upload data to the database
// Term headers are also column names

const db = require('../db.js')
const csv_parse = require("../helpers/data_parse.js")
const csv_placeholder = require("../helpers/placeholder.js")

class DataUpload {
    /**
     * Class constructor
     * @param {String} table name of db table
     * @param {String} file file to be uploaded
     */
    constructor (table, file) {
        this.valid_min_cols = new Set([]);
        this.on_conflict_cols = new Set([]);
        this.updatable_cols = new Set([]);

        this.table_name = table;
        this.file = file;
    }

    parse_data(data){
        // get the first row of data
        // this results in the original updated without first row
        let header = data.shift();
        // verify correct minimum header/columns

        // get the headers to string

        // get the placeholders
        const placeholder = csv_placeholder(data);

        console.log('hi1')
        // build final query string
        let insert_query = this.createQuery(header, placeholder) 
        console.log('hi')

        // clean the insertable data

        // return string query, final insertable data
        return {insert_query, insert_data: data}
    }

    /**
     * Heart and soul of what is to be uploaded.
     * Will throw errors when something is wrong.
     */
    async main_upload() {
        // get data from csv
        const data_array = csv_parse(this.file);
        if(!data_array) {
            // if something went wrong exit
            // csv_parse already prints error
            throw new Error("something went wrong in parsing");
        }
        // get the data and query
        const { insert_query, insert_data } = this.parse_data(data_array);

        console.log(insert_query, insert_data);
        
        // add to table
        //await db.pgGetPool().query(insert_query, insert_data);
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
    createQuery(header, placeholder) {
        const headerStr = DataUpload.getColumns(header)

        let r = `
            INSERT into ${this.table_name} (${headerStr})
            VALUES ${placeholder}
            ${this.generateOnConflict(header)}
        `;  
        return r;
    }

    generateOnConflict(header) {
        // get the intersection of known conflicts
        let inHeaders = new Set(header);

        let intersection_headers = inHeaders.intersection(this.on_conflict_cols)
        console.log(intersection_headers)
        // 

        //let DataUpload.on_conflict_cols.join(',')
        

        let r = `
            ON CONFLICT (${[...intersection_headers].join(',')})
            DO UPDATE SET
            `
        return r;
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

class DataUploadPeople extends DataUpload {
    

    constructor (table, file) {
        super(table, file);

        this.valid_min_cols = new Set(["first_name", "last_name"]);
        this.on_conflict_cols = new Set(["first_name", "last_name"]);
        this.updatable_cols = new Set(["is_gfu", "email"])
    }

    // /**
    //  * Template for people query insert
    //  * @param {String} headerStr The headers provided from data as a string
    //  * @param {String} placeholder string of psql placeholders. Ex ($1, $2)
    //  * @returns Query for db insert
    //  */
    // createQuery(headerStr, placeholder) {
    //     return  `
    //         INSERT into ${this.table_name} (${headerStr})
    //         VALUES ${placeholder}
    //         ON CONFLICT (${conflict_seg})
    //             DO UPDATE SET
    //      `;  

    //     // ON CONFLICT (first_name, last_name)
    //     // DO UPDATE SET
    //     //     first_name = EXCLUDED.first_name
    //     //     last_name = EXCLUDED.last_name
    //     //     email = EXCLUDED.email`
    // }
}

const table_to_class = {
    "people": DataUploadPeople,
    "location": DataUpload,
    "event": DataUpload,
    "series": DataUpload,
    "chapel_title": DataUpload
}

module.exports = table_to_class;
