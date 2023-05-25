import { exec } from 'child_process'
import fs from 'fs'

/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
const compareVersion = function (version1, version2) {
  // 将两个版本号切割成由修订号组成的数组
  const arr1 = version1.split('.')
  const arr2 = version2.split('.')
  // 比较两个数组的长度，得到最大的数组长度
  const maxLength = Math.max(arr1.length, arr2.length)

  // 遍历数组，分别比较同一个位置上的版本号
  for (let i = 0; i < maxLength; i++) {
    // 从左到右依次比较版本号
    const a = arr1[i] || 0
    const b = arr2[i] || 0
    //  忽略前导0，使用Number()转为数字
    if (Number(a) > Number(b))
      return 1

    else if (Number(a) < Number(b))
      return -1

    // 对比结束的时候，就返回 0
    if (i === maxLength - 1)
      return 0
  }
}

function test() {
  const data = fs.readFileSync('./package.json', 'utf-8')
  const version = process.argv[2].replace('--v', '')

  if (!version)
    return console.error('缺少 --v 参数')

  const packageText = JSON.parse(data)

  if (compareVersion(version, packageText.version) !== 1)
    return console.error('发布版本号小于当前版本', version, packageText.version, compareVersion(version, packageText.version))

  packageText.version = version
  const newText = JSON.stringify(packageText)
  fs.writeFileSync('./package.json', newText)

  exec('git add .', (err, stdout, stderr) => {
    if (err) {
      console.error('git add', err)
      return
    }
    exec(`git commit -m "release v${version}"`, (err, stdout, stderr) => {
      if (err) {
        console.error('git commit', err)
        return
      }

      exec('git push ', (err, stdout, stderr) => {
        if (err) {
          console.error('git push', err)
          return
        }

        exec(`git push origin v${version}`, (err, stdout, stderr) => {
          if (err)
            return console.error('git push tag', err)
        })
      })
    })
  })
}

test()
