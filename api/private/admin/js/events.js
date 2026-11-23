/**
 * JavaScript for fetching and displaying backend info
 */

// global vars
let people_list = null;
let events = null;
let eventsTable = null;

const dompar = new DOMParser(); // for the svg

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
        super(table);
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
            speaker.append(this.createSpeakerListButton())

            // add host
            let host_ele = document.createElement("td");

            row_element.append(id_ele, date_ele,ct_ele,time_ele,speaker,host_ele);
            table.append(row_element)
        }
    }

    createSpeakerListButton() {
        // create dropdown button
        let main = document.createElement("div");
        main.classList.add("flex-row", 'speaker-drop')
        

        // create text element
        // create conditional for no speaker and for with speaker
        let text_ele = document.createElement("div");
        text_ele.textContent = "No speakers..."

        // add dropdown svg
        let svg_pre = dompar.parseFromString('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,15L7,10H17l-5,5Z"/></svg>', 'text/html')
        let drop_icon = svg_pre.body.firstElementChild;

        main.append(text_ele, drop_icon);

        return main;
        
    }

    createPeopleDropdown () {
        // create main container

        // create a textBox

        // create container for people elements

        // iterate through people and add to list while filtering
    }
}

main();