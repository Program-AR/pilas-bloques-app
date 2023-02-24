const distPath = process.argv[2] // We expect to be called like "node experimentGroupId.js /foo/bar/dist", so third is distPath.
if(!distPath) throw "You must pass the dist folder path as a parameter to this script"

// replaciong the absolute /static/... path to relative static/... path
let indexContents = require("fs").readFileSync(distPath + "/index.html").toString()
indexContents = indexContents.replaceAll("/static/", "static/") // css and js
require("fs").writeFileSync(distPath + "/index.html", indexContents)
