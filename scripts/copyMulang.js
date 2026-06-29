const fs = require('fs')
const path = require('path')

const source = path.resolve(__dirname, '../node_modules/mulang/build/mulang.js')
const targetDir = path.resolve(__dirname, '../public/assets')
const target = path.resolve(targetDir, 'mulang.js')

console.log('Copying mulang.js to public/assets')

fs.mkdirSync(targetDir, { recursive: true })

let content = fs.readFileSync(source, 'utf8')

content = content.replace(
  /require\(['"]\.\.\/package\.json['"]\)\.version/g,
  "''"
)

content += `
;try {
  if (typeof mulang !== 'undefined') {
    window.mulang = mulang;
  }
} catch (e) {
  console.error('Could not expose mulang global', e);
}
`

fs.writeFileSync(target, content)