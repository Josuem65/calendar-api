const Event = require("../models/eventModel");
const mongoose = require("mongoose");

const getAllEvents = async (req, res) => {
  const { userId } = req.currentUser || "test-user"; // pass via middleware
  try {
    const allEvents = await Event.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(allEvents);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const addEvent = async (req, res) => {
  const { userId } = req.currentUser || "test-user"; // pass via middleware
  const eventDetails = req.body;
  try {
    const newEvent = await Event.create({
      ...eventDetails,
      userId, // current authenticated user
    });
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Event not found." });
    }
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }

    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateEvent = async (req, res) => {
  const { userId } = req.currentUser || "test-user"; // pass via middleware
  const { id } = req.params;
  const eventDetails = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Event not found." });
    }
    const event = await Event.findByIdAndUpdate(id, {
      ...eventDetails,
      userId,
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }

    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllEvents,
  addEvent,
  deleteEvent,
  updateEvent,
};
