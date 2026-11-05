const fs = require("fs");

// TODO make a csv reader that returns the array of each line
function readCSV(file)
{
    try 
    {
        const data = fs.readFileSync(file, 'utf8');
        return data
        .trim()
        .split('\n\r')

    } catch (err) 
    {
        console.error('Error reading CSV file:', err);
        return [[-1]];
    }
}

// TODO make a parser to return an array to be inserted into the database.
function readChapel(file) 
{
    const row = readCSV(file);
    try 
    {
        let array_of_rows = [];
        for (const row of rows) 
        {
             array_of_rows.push(row.split(','));
        }
        return array_of_rows;
    } 
    catch (err) 
    {
    console.error('Error parsing CSV', err);
    return [[-1]];
    }
}

function main()
{
    console.log(readChapel("api/csv_parser/chapel.csv"));
}

main()