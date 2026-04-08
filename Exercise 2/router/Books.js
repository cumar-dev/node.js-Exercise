const express = require('express');
const { getBooks, createBooks, updatedBooks, deleteBooks } = require('../controller/Books');
const router = express.Router();
router.get('/', getBooks);
router.post("/", createBooks);
router.put("/:id", updatedBooks);
router.delete("/:id", deleteBooks);
module.exports = router;