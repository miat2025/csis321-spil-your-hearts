async function main() {
    let people_list = await fetchGetBackend("/people");
    let events = await fetchGetBackend("/events");
    console.log(events, people_list)
}


main();