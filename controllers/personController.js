let persons = require("../models/persons");

exports.getAll = (req, res) => {
  res.json(persons);
};

exports.get = (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((item) => item.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
};

exports.delete = (req, res) => {
  const id = Number(req.params.id);
  let temp;
  persons = persons.filter((item) => {
    if (item.id !== id) {
      return item;
    } else {
      temp = item;
    }
  });

  if (temp) {
    res.json(temp);
  } else {
    res.status(404).end();
  }
};

exports.post = (req, res) => {
  const person = req.body;

  if (!person.name || !person.number) {
    return res.status(404).json({ error: "The name or number is missing" });
  }

  if (
    persons.find(
      (item) => item.name.toLowerCase() === person.name.toLowerCase()
    )
  ) {
    return res
      .status(404)
      .json({ error: "The name already exists in the phonebook" });
  }

  person.id = Math.floor(Math.random() * 1000);

  persons.push(person);
  res.json(person);
};
