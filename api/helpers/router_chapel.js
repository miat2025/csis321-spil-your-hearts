import express from "express"
import chapel from './chapel.js'


const router = express.Router();

// get the next 5 set of chapel dates
router.get("/next", async (req, res) => {
    // try to get info from database
    try {
        let nextDates = await chapel.getNextDates();
        res.status(200).json(nextDates);
    } catch(error) {
        // if something is wrong, return proper statsus code
        res.status(500).json(["Internal Error"])
    }
})

// get the next set 10 of chapel dates
router.get("/nextExt", async (req, res) => {
    // try to get info from database
    try {
        let nextDates = await chapel.getNextDates();
        res.status(200).json(nextDates);
    } catch(error) {
        // if something is wrong, return proper statsus code
        res.status(500).json(["Internal Error"])
    }
})
export default router;