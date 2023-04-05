
let indexPath = process.argv[2]
if(!indexPath) throw "You must pass the ember build folder path as a parameter to this script"
indexPath += "/index.html"

let rootURL = process.argv[3]
if(rootURL === undefined) throw "You must pass the root URL of the ember project to this script"

console.log(`Replacing Ember ENV. Index: ${indexPath}. rootURL: ${rootURL}`)
const fs = require("fs")
// Getting index contents
const oldIndex = fs.readFileSync(indexPath).toString()
// Getting Ember environment current configuration as a string
const metaContents = oldIndex.split(`<meta name="pilasbloques/config/environment" content=`)[1].split(`/>`)[0]
// Replacing environment configuration with new
var newIndex = oldIndex.replace(metaContents, JSON.stringify(replaceApiUrl(JSON.parse(metaContents))))
// deletes rootURL from emberPB index.html. They were causing incorrect relative accesses.
newIndex = newIndex.replace(/src=".*assets\//g, `src="${rootURL}assets/`)
newIndex = newIndex.replace(/href=".*assets\//g, `href="${rootURL}assets/`)
// Writing new index file
fs.writeFileSync(indexPath, newIndex)


function replaceApiUrl(encodedEnvironment) {
  const environment = JSON.parse(decodeURIComponent(encodedEnvironment))
  environment.rootURL = rootURL
  return encodeURIComponent(JSON.stringify(environment))
}
