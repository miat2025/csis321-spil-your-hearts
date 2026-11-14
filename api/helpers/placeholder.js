import row_of_columns from './data_parse.js';

function placeholderFunction()
{
    const stringify = [];
    try
    {
        for (let j = 0; j < row_of_columns.length; j++)
            
            for (let i = 0; i < row_of_columns[j].length; i++)
            {
                if (i == 0)
                {
                    stringify.push("(");
                }

                stringify.push("$%d," % i + row.toString());

                if ( i == row_of_columns[j].length - 1)
                {
                    stringify.push(")");
                }
            }
    }
    catch (err)
    {
        console.error("Error occurred while processing row_of_columns:", err);
    }

    console.log(stringify);
}