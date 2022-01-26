const persons = require("../models/persons");

exports.get = (req, res) => {
  res.send(`Phonebook has info for ${persons.length} people</br>${new Date()}`);
};
