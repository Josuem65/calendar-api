const express = require("express");
const {
    getAllEvents,
    addEvent,
    deleteEvent,
    updateEvent,
} = require("../controllers/eventsController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();
router.use(requireAuth);

router.get("/", getAllEvents);

router.post("/", addEvent);

router.delete("/:id", deleteEvent);

router.patch("/:id", updateEvent);

module.exports = router;
