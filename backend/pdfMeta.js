const fs = require("fs");
const path = require("path");

function loadMetadata(pdfFileName) {
    const pdfDir = path.join(__dirname, "pdfs");
    const metaPath = path.join(pdfDir, pdfFileName + ".json");

    // Default values if metadata doesn't exist
    const defaultMeta = {
        title: "N/A",
        description: "N/A"
    };

    try {
        if (fs.existsSync(metaPath)) {
            const data = fs.readFileSync(metaPath, "utf-8");
            return JSON.parse(data);
        } else {
            return defaultMeta;
        }
    } catch (err) {
        console.error("Metadata error:", err);
        return defaultMeta;
    }
}

module.exports = { loadMetadata };
