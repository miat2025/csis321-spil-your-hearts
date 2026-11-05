import express from "express"
import chapel from './chapel.js'


const router = express.Router();

// get the next 5 set of chapel dates
router.get("/next", async (req, res) => {
    let nextDates = await chapel.getNextDates();
    res.status(200).json(nextDates)

})

// get the next set 10 of chapel dates
router.get("/next_ext", async (req, res) => {
    let nextDates = await chapel.getNextDates();
    res.status(200).json(nextDates)
})
export default router;