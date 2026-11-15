/**
 * this function is for creating nodejs 'pg' library placeholders for inserting data
 */

const csv_parse = require("../helpers/data_parse.js")

function placeholderFunction(array)
{
    const row = array.length
    const columns = array[0].length

    // main container to hold rows
    const stringify = [];
    let c = 1; // counter for incrementing

    // read each row
    for (let j = 0; j < row; j++) {
        // hold the content ($1) for each column
        let inner_layer = []

        // iterate each column
        for (let i = 0; i < columns; i++)
        {
            // add the placeholder to array
            inner_layer.push(`$${c++}`)
        }

        // join the array and add the parentheses to build a row
        let built = "(" + inner_layer.join(",") + ")";
        // add row to main container
        stringify.push(built)
    }

    // create the final result
    // join and add parentheses
    let result = "(" + stringify.join(',') + ")"

    return result;
}

module.exports = placeholderFunction