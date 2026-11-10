const fs = require("fs");

// A csv reader that returns the array of each line
function readCSV(file)
{
    try 
    {
        const data = fs.readFileSync(file, 'utf8');
        data = data.trim().split('\n');
        output = data;

    } catch (err) 
    {
        console.error('Error reading CSV file:', err);
        output = [[-1]];
    }
    return output;
}

// A parser to return an array to be inserted into the database.
function readChapel(file) 
{
    const rows = readCSV(file);
    try 
    {
        let array_of_rows = [];
        for (const row of rows) 
        {
            array_of_rows.push(row.replaceAll("\r","").split(','));
            console.log(row.split(','))
        }
        output = array_of_rows;
    } 
    catch (err) 
    {
    console.error('Error parsing CSV', err);
    output = [[-1]];
    }
    return output;
}

function main()
{
    console.log(readChapel("events.csv"));
}

main()