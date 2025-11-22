const fs = require("fs");
const path = require("path");

function loadMetadata(pdfFileName) {
    const PDF_FOLDER = path.join(__dirname, "pdfs");
    const metaPath = path.join(PDF_FOLDER, pdfFileName + ".json");

    // default values if metadata doesn't exist
    const defaultMeta = {
        title: "N/A",
        description: "N/A"
    };

    //if the meta data existes then read the files and return the data inside else just return default metadata
    if (fs.existsSync(metaPath)) {
        const data = fs.readFileSync(metaPath, "utf-8");
        return JSON.parse(data);
    } else {
        return defaultMeta;
    }
 
}

module.exports = { loadMetadata };
