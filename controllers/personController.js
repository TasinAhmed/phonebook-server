let person = require("../models/person");

exports.getAll = (req, res) => {
  person
    .find({})
    .then((result) => res.json(result))
    .catch((err) => {
      res.status(404).end();
    });
};

exports.get = (req, res) => {
  const id = req.params.id;
  person
    .findById(id)
    .then((result) => res.json(result))
    .catch((err) => res.status(404).end());
};

exports.delete = (req, res) => {
  const id = req.params.id;

  person
    .findByIdAndRemove(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).end();
    });
};

exports.post = (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(404).json({ error: "The name or number is missing" });
  }

  const newPerson = new person({
    name,
    number,
  });

  newPerson
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).end();
    });
};

exports.put = (req, res) => {
  const id = req.params.id;
  const { name, number } = req.body;

  if (!name || !number || !id) {
    return res.status(404).json({ error: "The name or number is missing" });
  }

  person
    .findByIdAndUpdate(id, { name, number })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).end();
    });
};
