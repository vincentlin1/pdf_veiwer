/* pdfDisc.js module provides 
that it searches for available PDF documents in a designated folder
The module scans the pdfs folder and create a list of available PDFs
This list is to be used to display available PDFs on the website
The module handles file system operations to read directory contents
it caches the PDF list to avoid repeated file system reads
*/
const fs = require('fs');
const path = require('path');

//the pdf folder
const PDF_FOLDER = path.join(__dirname, 'pdfs');
//intiaze the cache list and the time 
let cachedPDFs = null;
let lastCacheTime = 0;
const cacheExpire = 60 * 1000; // 1 minute 

function PDFList(callback) {
//find the time right now for the cache
  const now = Date.now();

  // return cache if there is still a cached list and the time is not expired 
  if (cachedPDFs && (now - lastCacheTime) < cacheExpire) {
    return callback(null, cachedPDFs);
  }
//read the dir of pdfs try to fliter all the pdfs found on https://www.geeksforgeeks.org/node-js/node-js-fs-readdir-method/ 
 fs.readdir(PDF_FOLDER, (err, files) => {
        if (err) {
            // If there's an error, pass it to the callback as the first argument
            console.error('Error reading PDF folder:', err);
            return callback(err, null); 
        }

        // filter the files to only files that ends with pdf
        const pdfs = files.filter(file => file.endsWith('.pdf'));
        
        //update the cache array and the time 
        cachedPDFs = pdfs;
        lastCacheTime = now;

        // return the results via the callback (err first, then result)
        callback(null, pdfs);
    });
}


module.exports = { PDFList };
