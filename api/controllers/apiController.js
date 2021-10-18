const Customer = require("../models/apiModel.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      const event = new Event({
        name: req.body.name,
        inscrit: req.body.inscrit,
        nombre_inscrit: req.body.nombre_inscrit
      });
    
      // Save Customer in the database
      Event.create(event, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Customer."
          });
        else res.send(data);
      });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    exports.findAll = (req, res) => {
        Event.getAll((err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving customers."
            });
          else res.send(data);
        });
      };
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Event.findById(req.params.eventId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Event with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Customer with id " + req.params.customerId
            });
          }
        } else res.send(data);
      });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
   // Validate Request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Customer.updateById(
    req.params.eventId,
    new Event(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Event with id ${req.params.eventId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Event with id " + req.params.eventId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Event.remove(req.params.eventId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found event with id ${req.params.eventId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete event with id " + req.params.eventId
            });
          }
        } else res.send({ message: `event was deleted successfully!` });
      });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
    Event.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all events."
          });
        else res.send({ message: `All Events were deleted successfully!` });
      });
};