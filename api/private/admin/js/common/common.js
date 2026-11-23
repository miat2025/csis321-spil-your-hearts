/**
 * Basic get api request
 * @param {String} link Link to fetch data from
 * @returns JSON
 */
async function fetchGet(link) {
    return new Promise ((res, rej)=>{
        fetch(link).then(responce => {
            if (!responce.ok) {console.log(`HTTP error! status: ${responce.status}`, link);}
			return responce.json();
        })
        .then(json => {
            res(json); // return result
        })
        .catch(e => {
            // reject result
            console.error(e)
            rej(e);
        })
    })
}

async function fetchGetBackend(route) {
    return await fetchGet(`${window.location.origin}/be` + route)
}


class TableManager {
    /**
     * Create manager
     * @param {Document} table table node
     */
    constructor (table) {
        this.table_element = table; // hold the dom element
    }

    /**
     * Return the head node for the head
     */
    getHead(){
        return this.table_element
    }
}
