// TODO Make a class to upload data to the database
// Term 'headers' are also "column names"
// TODO document functions!!

const db = require('../db.js')
const csv_parse = require("../helpers/data_parse.js")
const csv_placeholder = require("../helpers/placeholder.js")

/**
 * Class for uploading data onto the database
 */
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

    /**
     * parse the data before db use
     * @param {Array} data Array of csv data
     * @returns an object of a query and the final array of data to upsert
     */
    async parse_data(data){
        // get the first row of data
        // this results in the original updated without first row
        let header = data.shift();

        // verify correct minimum header/columns
        if (! this.headerVerification(header)) {
            throw new Error("invalid columns from file");
        }

        // get the placeholders
        const placeholder = csv_placeholder(data);

        // build final query string
        let insert_query = this.createQuery(header, placeholder);

        // clean the insertable data
        data = await this.cleanData(header, data);
        console.log(data);

        // return string query, final insertable data
        return {insert_query, insert_data: data.flat()};
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
        const { insert_query, insert_data } = await this.parse_data(data_array);

        // add to database
        //await db.pgGetPool().query(insert_query, insert_data.flat());
    }

    /**
     * Verify the headers are valid for the selected table
     * @param {Array} header Array of column (header) data
     * @returns boolean if data is valid
     */
    headerVerification(header) {
        let inputHeaders = new Set(header);

        // ensure required columns are in input header
        for(const reqired_cols of [...this.valid_min_cols]){
            //if the column does not has minimum required, error
            if (!inputHeaders.has(reqired_cols)){
                return false;
            }
        }
        return true;
    }

    /**
     * Clean the array. Will replace certain data from database if required
     * @param {Array} array array of 2d data to clean
     * @returns cleaned array
     */
    async cleanData(header,array) {
        return array;
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

    /**
     * Create an on conflict query of there are any
     * @param {array} header array of column data
     * @returns string of on conflict info or empty string.
     */
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

    static valueToId(data, key_name) {
        // initialize map
        let map = {};
        // loop data for matching
        for (const row of data) {
            // match key name to and id
            map[row[key_name]] = row.id;
        }

        return map;
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
        this.on_conflict_cols = new Set(["last_name", "first_name"]);
        this.updatable_cols = new Set(["is_gfu", "email"])
    }
}

class DataUploadLocation extends DataUpload {
    constructor (table, file) {
        super(table, file);

        this.valid_min_cols = new Set(["code", "name", "address", "city", "state", "country"]);
        this.on_conflict_cols = new Set(["code"]);
        this.updatable_cols = new Set(["name", "address", "city", "state", "country", "state", "zip"])
    }
}

class DataUploadEvent extends DataUpload {
    // constructor (table, file) {
    //     super(table, file);

    //     this.valid_min_cols = new Set(["code", "name", "address", "city", "state", "country"]);
    //     this.on_conflict_cols = new Set(["code"]);
    //     this.updatable_cols = new Set(["name", "address", "city", "state", "country", "state", "zip"])
    // }

     /**
     * Clean the array. Will replace certain data from database if required
     * @param {Array} array array of 2d data to clean
     * @returns cleaned array
     */
    async cleanData(header,array) {
        // Idea is to replace name to an ID

        // select the data that we need to interpret what the data means
        let psql = await db.pgGetConnection();

        let chapel_titles = (await psql.query("SELECT id, title FROM chapel_title;")).rows; // we are needing the rows data only
        let locations = (await psql.query("SELECT id, name FROM location;")).rows;
        let series = (await psql.query("SELECT id, name FROM series;")).rows

        await psql.end();

        // convert the data to a map we can quickly select where data does
        let ct_map = DataUpload.valueToId(chapel_titles, "title");
        let loc_map = DataUpload.valueToId(locations, "name");
        let series_map = DataUpload.valueToId(series, "name")

        // look through array for what is needed to be replaced for an id
        // 1. locate what column index each element is in
        let ct_idx = header.indexOf("chapel_title");
        let loc_idx = header.indexOf("location");
        let series_idx = header.indexOf("series");

        // create a boolean if any of the data is there
        const HAS_CT = (ct_idx != -1);
        const HAS_LOC = (loc_idx != -1);
        const HAS_SERIES = (series_idx != -1);

        // 2. perform replacement for each column
        for (const row of array) {
            // nullish coalescing operator my beloved -levi

            // replace chapel title
            if (HAS_CT) row[ct_idx] = ct_map[row[ct_idx]] ?? row[ct_idx];

            // replace locations
            if (HAS_LOC) row[loc_idx] = loc_map[row[loc_idx]] ?? row[loc_idx];

            // replace series
            if (HAS_SERIES) row[series_idx] = series_map[row[series_idx]] ?? row[series_idx];
        }

        return array;
    }
}

const table_to_class = {
    "people": DataUploadPeople,
    "location": DataUploadLocation,
    "events": DataUploadEvent,
    "series": DataUpload,
    "chapel_title": DataUpload
}

module.exports = table_to_class;
