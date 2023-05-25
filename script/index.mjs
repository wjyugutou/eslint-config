import { exec } from 'child_process'
import fs from 'fs'

function test() {
  const data = fs.readFileSync('./package.json', 'utf-8')
  const version = process.argv[2].replace('--v', '')

  console.log('============')
  console.log(version)
  console.log('============')

  if (!version)
    return console.error('缺少 --v 参数')

  const packageText = JSON.parse(data)
  packageText.version = version
  const newText = JSON.stringify(packageText)
  fs.writeFileSync('./package.json', newText)

  exec('git add .', (err, stdout, stderr) => {
    if (err) {
      console.error(err)
      return
    }
    exec(`git commit -m "release v${version}"`, (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        return
      }

      exec('git push ', (err, stdout, stderr) => {
        if (err)
          console.error(err)
      })

      exec(`git push origin v${version}`, (err, stdout, stderr) => {
        if (err)
          console.error(err)
      })
    })
  })
}

test()
