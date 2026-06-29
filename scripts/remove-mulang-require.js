const fs = require('fs')

const file = './node_modules/mulang/build/mulang.js'

console.log('Removing mulang require version')

if (fs.existsSync(file)) {
  const content = fs.readFileSync(file, 'utf8')
  const patched = content.replace(
    /require\(['"]\.\.\/package\.json['"]\)\.version/g,
    "''"
  )
  fs.writeFileSync(file, patched)
}