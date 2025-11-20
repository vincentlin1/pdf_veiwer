//textbook 
const express = require("express");
const path = require("path");
const router = express.Router();

// get the home page 
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});



// geting the pdfs
router.get("/pdf/Dog", (req, res) => {
  res.sendFile(path.join(__dirname, "pdfs", "Dog.pdf"));
});

router.get("/pdf/cat", (req, res) => {
  res.sendFile(path.join(__dirname, "pdfs", "cat.pdf"));
});

router.get("/pdf/turtle", (req, res) => {
  res.sendFile(path.join(__dirname, "pdfs", "turtle.pdf"));
});


// 404 HANDLER FOR THIS MODULE
router.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

module.exports = router;
