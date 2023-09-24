const router = require("express").Router();
const Event = require("../models/Event");
const handleError = require("../utils/eventErrors");

export const getEvent = async (req, res, next) => {
  const events = await Event.find({});
  try {
    res.status(200).json(events);
  } catch (err) {
    handleError(err, res);
  }
};

export const findOneEvent = async (req, res, next) => {
  const id = req.params.id;
  const event = await Event.findById(id);

  try {
    res.status(200).json(event);
  } catch (err) {
    handleError(err, res);
  }
};

export const createEvent = async (req, res, next) => {
  const newEvent = await new Event(req.body);

  try {
    await newEvent.save((err, event) => {
      if (err) {
        handleError(err, res);
      } else {
        res.status(200).json(event);
      }
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const updateEvent = async (req, res, next) => {
  const id = req.params.id;
  try {
    const event = await Event.findOne({ _id: id });
    if (event) {
      Object.assign(event, req.body);
      event.save((err, event) => {
        if (err) {
          handleError(err, res);
        } else {
          res.status(200).json(event);
        }
      });
    }
    if (!event) {
      res.status(404).json({ error: "event is not found" });
    }
  } catch (err) {
    console.log(err);
    handleError(err, res);
  }
};

export const deleteEvent = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Event.findByIdAndRemove(id);
    res.status(200).json("Event has been deleted");
  } catch (err) {
    handleError(err, res);
  }
};
