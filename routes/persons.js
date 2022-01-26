const express = require("express");
const router = express.Router();
const personController = require("../controllers/personController");

router.get("/", personController.getAll);

router.get("/:id", personController.get);

router.delete("/:id", personController.delete);

router.post("/", personController.post);

module.exports = router;
