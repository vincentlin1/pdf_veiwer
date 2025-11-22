//textbook 
const express = require("express");
const path = require("path");
const router = express.Router();
const pdfDisc = require('./pdfDisc');
const {validatePDF} = require('./pdfValid')


// get the home page 
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

//find all the pdfs 
router.get('/pdfs', (req, res) => {
  //gets the pdf list
  pdfDisc.PDFList((err, pdfList) => {
    if (err) {
      return res.status(404).json({ error: "PDF list error" });
    }
    //sends the reslut
    res.json(pdfList);
  });
});

// geting the pdfs
router.get('/pdfs/:fileName', (req, res) => {
    const pdfName = req.params.fileName;

    //validate the pdf if it exists then send the file if error then send 404 error
    validatePDF(pdfName, (err, validPath) => {
        if (err) {
            return res.status(404).json({ error: "PDF not found" });
        }
        res.sendFile(validPath);
    });
});



// router.get("/pdf/Dog", (req, res) => {
//   res.sendFile(path.join(__dirname, "pdfs", "Dog.pdf"));
// });

// router.get("/pdf/cat", (req, res) => {
//   res.sendFile(path.join(__dirname, "pdfs", "cat.pdf"));
// });

// router.get("/pdf/turtle", (req, res) => {
//   res.sendFile(path.join(__dirname, "pdfs", "turtle.pdf"));
// });


// 404 HANDLER FOR THIS MODULE
router.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

module.exports = router;
