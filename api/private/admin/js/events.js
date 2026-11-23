/**
 * JavaScript for fetching and displaying backend info
 */

async function main() {
    let people_list = await fetchGetBackend("/people");
    let events = await fetchGetBackend("/events");
    console.log(events, people_list)
}

/**
 * add data to the table
 * @param {Array} data event data
 */
function populateEventsTable(data){
    // get the table

    // iterate through data
    for(const row of data) {
        // create row element

        // add id

        // add date

        // add chaple title

        // add time

        // add speaker

        // add host

    }
}

class EventsTable extends TableManager {
    constructor (table) {
        super(table)
        this.people = null;
        this.events = null;
    }

}

main();