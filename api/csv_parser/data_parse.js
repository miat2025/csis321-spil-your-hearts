// parser module for returing a 2d array of csv values

const fs = require("fs");

// A csv reader that returns the array of each line
function readCSV(file)
{
    try 
    {
        const data = fs.readFileSync(file, 'utf8');
        return data.trim().split('\n')

    } catch (err) 
    {
        console.error('Error reading CSV file:', err);
        return null;
    }
    return output;
}

// A parser to return an array to be inserted into the database.
function readChapel(file) 
{
    const rows = readCSV(file);
    try 
    {
        let row_of_columns = [];
        for (const row of columns) 
        {
            row_of_columns.push(row.replaceAll("\r","").split(','));
            console.log(row.split(','))
        }
        output = row_of_columns;
    } 
    catch (err) 
    {
        console.error('Error parsing CSV', err);
        return null;
    }
    return output;
}

module.exports = readChapel;

// removed main for turning module into an export

// function main()
// {
//     console.log(readChapel("events.csv"));
// }

// main()