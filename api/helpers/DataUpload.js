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
        if (! this.headerVerification(header)) {
            throw new Error("invalid columns from file")
        }

        // get the placeholders
        const placeholder = csv_placeholder(data);

        // build final query string
        let insert_query = this.createQuery(header, placeholder) 

        // clean the insertable data

        // return string query, final insertable data
        return {insert_query, insert_data: data.flat()}
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
        
        // add to database
        await db.pgGetPool().query(insert_query, insert_data.flat());
    }

    headerVerification(header) {
        let inputHeaders = new Set(header);

        // ensure required columns are in input header
        for(const reqired_cols of [...this.valid_min_cols]){
            //if the column does not has minimum required, error
            if (!inputHeaders.has(reqired_cols)){
                return false
            }
        }
        return true;
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
        // keep track of headers to insert
        let inputHeaders = new Set(header);

         // get the intersection of columns we have that need updating
        let cols_to_update = inputHeaders.intersection(this.updatable_cols)

        // if there are no colums for conflicts, return nothing
        if(!cols_to_update.size){
            return ''
        }
        // keep track of updating columns
        let updating_cols = []

        // add string to be updated
        for (const col of [...cols_to_update]) {
            updating_cols.push(`${col} = EXCLUDED.${col}`)
        }
        
        // create template
        let r = `ON CONFLICT (${[...this.on_conflict_cols].join(',')}) DO UPDATE SET 
            ${updating_cols.join(",")}
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
}

const table_to_class = {
    "people": DataUploadPeople,
    "location": DataUpload,
    "event": DataUpload,
    "series": DataUpload,
    "chapel_title": DataUpload
}

module.exports = table_to_class;
