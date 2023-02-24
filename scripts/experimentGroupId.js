const distPath = process.argv[2] // We expect to be called like "node experimentGroupId.js /foo/bar/dist", so third is distPath.
if(!distPath) throw "You must pass the dist folder path as a parameter to this script"

// we replace the absolute /static path to relative path
let indexContents = require("fs").readFileSync(distPath + "/index.html").toString()
indexContents = indexContents.replace("/static/", "static/")
indexContents = indexContents.replace("/static/", "static/")
require("fs").writeFileSync(distPath + "/index.html", indexContents)

const contentTag = indexContents.split(`<meta name="pilasbloques/config/environment" content=`)[1]?.split(`/>`)[0]
try
    {
    const experimentGroup = JSON.parse(decodeURIComponent(JSON.parse(contentTag))).experimentGroup
    console.log(experimentGroup[0])
    }
catch {

}
