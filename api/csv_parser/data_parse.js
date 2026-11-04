const fs = require("fs");

// TODO make a csv reader that returns the array of each line
function readCSV(file){
    try {
        const data = fs.readFileSync(file, 'utf8');
        return data
        .trim()
        .split('\n')
        .map(line => line.split(','));
    } catch (err) {
        console.error('Error reading CSV file:', err);
        return [[-1]];
    }
}

// TODO make a parser to return an array to be inserted into the database.
function readChapel(file){
return readCSV(file).slice(1).map(row => ({
    date: row[0],
    location: row[1],
    series: row[2],
    speaker: row[3],
    topic: row[4]
}));


}

function main(){
    console.log("hello")
}

main()