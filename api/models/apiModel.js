const sql = require("../config/db.js");

// constructor
const Event = function(event) {
  this.name = event.name;
  this.inscrit = event.inscrit;
  this.nombre_inscrit = event.nombre_inscrit;
};

Event.create = (newEvent, result) => {
  sql.query("INSERT INTO event SET ?", newEvent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created event: ", { id: res.insertId, ...newEvent });
    result(null, { id: res.insertId, ...newEvent });
  });
};

Event.findById = (eventId, result) => {
  sql.query(`SELECT * FROM event WHERE id = ${eventId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found event: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Event with the id
    result({ kind: "not_found" }, null);
  });
};

Event.getAll = result => {
  sql.query("SELECT * FROM events", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("events: ", res);
    result(null, res);
  });
};

Event.updateById = (id, event, result) => {
  sql.query(
    "UPDATE event SET name = ?, inscrit = ?, nombre_inscrit = ? WHERE id = ?",
    [event.name, event.inscrit, event.nombre_inscrit, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Event with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated event: ", { id: id, ...event });
      result(null, { id: id, ...event });
    }
  );
};

Event.remove = (id, result) => {
  sql.query("DELETE FROM events WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Event with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted event with id: ", id);
    result(null, res);
  });
};

Event.removeAll = result => {
  sql.query("DELETE FROM events", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} events`);
    result(null, res);
  });
};

module.exports = Event;