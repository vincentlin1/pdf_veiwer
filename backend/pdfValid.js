/* pdfValid.js
*/
const fs = require('fs');
const path = require('path');

const PDF_FOLDER = path.join(__dirname, 'pdfs');


// pdfNameString: the filename supplied by the user
function validatePDF(pdfNameString, callback) {

    // if there is nothing sent send back error
    if (!pdfNameString) {
        return callback(err, null);
    }

    // make it so it just the base name (aka .../pdfs/dog.pdf returns /dog.pdf)
    //should prevent any tarverals
    //found here https://www.w3schools.com/nodejs/met_path_basename.asp
    const safeName = path.basename(pdfNameString);

    // build the file path only which i allow 
    const fullPath = path.join(PDF_FOLDER, safeName);

    // make sure the path stays inside the pdf folder
    if (!fullPath.startsWith(PDF_FOLDER)) {
        return callback(err, null);
    }

    // check if the file exists
    fs.stat(fullPath, (err, stats) => {
        if (err || !stats.isFile()) {
            return callback(err, null);
        }

        // if everything is all good send back the path
        callback(null, fullPath);
    });
}

module.exports = { validatePDF };
