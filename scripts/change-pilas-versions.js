/* ECM module needed
import shell from 'shelljs'
import fs from 'fs'
*/

const shell = require('shelljs')
const fs = require('fs')

function version(packageName) {
  const pack = fs.readFileSync('node_modules/'+packageName+'/package.json')
  return JSON.parse(pack).version
}

function copyToPublic(dependency){
  const LIBS_PATH = `public/libs/`
  console.log(`Copying ${dependency} files to ${LIBS_PATH}`)
  shell.mkdir('-p', LIBS_PATH)
  shell.cp("-rf", `node_modules/${dependency}/dist/*`, LIBS_PATH )
}

function changeVersion(dependency){
  copyToPublic(dependency)
  console.log(`Changing ${dependency} version in pilas.html`)
  const regex = new RegExp(`${dependency}.js\\?v=[0-9]*.[0-9]*.[0-9]*`)
  const replacement = `${dependency}.js?v=${version(dependency)}`
  shell.sed('-i', regex, replacement, 'public/pilas.html')
}

changeVersion('pilasweb')
changeVersion('pilas-bloques-exercises')