/**
 * JavaScript for fetching and displaying backend info
 */

// global vars
let people_list = null;
let events = null;
let eventsTable = null

/**
 * main function
 */
async function main() {
    // get data
    people_list = await fetchGetBackend("/people");
    events = await fetchGetBackend("/events");

    // set up table controller
    eventsTable = new EventsTable(document.getElementById("events-table"));
    eventsTable.populateTable(events)
    console.log(events, people_list);
}


class EventsTable extends TableManager {
    constructor (table) {
        super(table)
        this.people = null;
        this.events = null;
    }

    /**
     * add data to the table
     * @param {Array} data event data
     */
    populateTable() {
        // get the table
        let table = this.getTable()
        console.log(table)
        
        // iterate through data
        for(const row of events) {
            // create row element

            // add id

            // add date

            // add chaple title

            // add time

            // add speaker

            // add host

        }
    }
}

main();