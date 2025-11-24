//textbook 
const express = require("express");
const path = require("path");
const router = express.Router();
const pdfDisc = require('./pdfDisc');
const {validatePDF} = require('./pdfValid')
const { loadMetadata } = require("./pdfMeta");



// Home page
router.get("/", (req, res) => {
  res.render("home");
});


//find all the pdfs then send the json
router.get('/pdfs', (req, res) => {
  //gets the pdf list
  pdfDisc.PDFList((err, pdfList) => {
    if (err) {
      return res.render("404");
    }
    //maps each pdflist with their meta data and makes an object for website handling 
    const result = pdfList.map(pdfFileName => {
      //gets metadata
      const meta = loadMetadata(pdfFileName);
      //result = {filename,title,description}
      return {
        filename: pdfFileName,
        title: meta.title,
        description: meta.description
      };
    });
    //sends the reslut
    res.render("pdfs", { result });
  });
});

// geting the pdfs
router.get('/pdfs/:fileName', (req, res) => {
    const pdfName = req.params.fileName;
  
//validate the pdf if it exists then send the file if error then send 404 error
    validatePDF(pdfName, (err, validPath) => {
        if (err) {
            return res.status(404).render("404");
        }
        res.sendFile(validPath);
    });
});
//if user want to download the file then validate and download
router.get('/pdfs/:fileName/download', (req, res) => {
    const pdfName = req.params.fileName;

    validatePDF(pdfName, (err, validPath) => {
        if (err) {
            return res.status(404).render("404");
        }
        res.download(validPath, pdfName, (downloadErr) => {
            if (downloadErr) console.error("Download error:", downloadErr);
        });
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


// 404
router.use((req, res) => {
  res.status(404).render("404");
});

module.exports = router;
