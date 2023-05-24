import fs from 'fs'

const data = fs.readFileSync('./package.json', 'utf-8')
const version = process.argv[2].replace('--v', '')

const packageText = JSON.parse(data)
packageText.version = version
const newText = JSON.stringify(packageText)
fs.writeFileSync('./package.json', newText)
