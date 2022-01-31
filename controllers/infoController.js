const contact = require("../models/person");

exports.get = (req, res) => {
  contact
    .find({})
    .then((result) => {
      res.send(
        `Phonebook has info for ${result.length} people</br>${new Date()}`
      );
    })
    .catch((err) => res.status(404).end());
};
