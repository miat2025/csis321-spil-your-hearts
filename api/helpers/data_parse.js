// parser module for returing a 2d array of csv values

const fs = require("fs");
const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;


/**
 * read the csv file and return a row of data
 * @param {string} file name of the file
 * @returns array of strings
 */
function readCSV(file)
{
    try 
    {
        // try to read the file
        const data = fs.readFileSync(file, 'utf8');
        return data.split('\n')

    } 
    catch (err) // return error and null
    {
        console.error('Error reading CSV file:', err);
        return null;
    }
}

/**
 * A parser to return an array to be inserted into the database.
 * @param {string} file filename
 * @returns array of rows and column
 */
function readChapel(file) 
{
    // read the file
    const rows = readCSV(file);

    // if there was an error or returned null
    if(!rows) {
        return null
    }

    // create a container to hold rows
    let array_of_rows = [];
    for (const row of rows) 
    {
        // split each element into their own column
        let row_arr = row.replaceAll("\r","").split(regex);

        // container to hold results
        let final = []

        // clean each element
        for (let i = 0; i < row_arr.length; i++){
            // our element
            let col = row_arr[i].trim();
            let col_lower = col.toLowerCase();

            // if element if an empty string, it is null
            col = (col_lower === 'true')? true : col
            col = (col_lower === 'false')? false : col
            
            // if empty string, turn null
            col = (col === '')? null : col

            // push results
            final.push(col)
        }

        array_of_rows.push(final);
    }
    // return results
    return array_of_rows;
}

module.exports = readChapel;