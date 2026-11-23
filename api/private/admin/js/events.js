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
            let row_element = document.createElement("tr");

            // add id
            let id_ele = document.createElement("td");
            id_ele.textContent = row.id;

            // add date
            let date_ele = document.createElement("td");
            date_ele.textContent = row.date;

            // add chaple title
            let ct_ele = document.createElement("td");
            ct_ele.textContent = row.title;

            // add time
            let time_ele = document.createElement("td");
            time_ele.textContent = row.time_start;

            // add speaker
            let speaker = document.createElement("td");

            // add host
            let host_ele = document.createElement("td");

            row_element.append(id_ele, date_ele,ct_ele,time_ele,speaker,host_ele);
            table.append(row_element)
        }
    }
}

main();