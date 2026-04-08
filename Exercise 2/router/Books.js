const express = require('express');
const { getBooks, createBooks, updatedBooks, deleteBooks, getInfoBooks } = require('../controller/Books');
const router = express.Router();
router.get('/', getBooks);
router.post("/", createBooks);
router.put("/:id", updatedBooks);
router.delete("/:id", deleteBooks);
router.get("/:id", getInfoBooks);
module.exports = router;