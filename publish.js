#!/usr/bin/env node
import { existsSync, unlinkSync } from 'fs'
import { join } from 'path'
import { getRequest, execCmdSync, execCmd } from './util'

const cwd = process.cwd()
const modules = ['@yugutou/eslint-config',]
const projects = [
  'doctor_web',
  'patient_web',
  'heart-doctor',
  'heart-patient',
  'tumour-doctor',
  'tumour-patient',
  'mini-hospital',
  'mh-doctor'
]
let version = process.argv[2]

main()

async function main () {
  if (version === undefined) {
    console.log('查找版本号！')
    version = await computeVersion()
    console.log('版本号为：' + version)
  }
  console.log('设置npm代理')
  execCmdSync('npm config set registry https://registry.npm.taobao.org')
  console.log('替换baqi包、baqi-xxx包的version号\n将baqi-xxx包中引入baqi的方式替换成version引入')
  for (let i = 0; i < modules.length; i++) {
    replaceVersionAndImport(modules[i])
  }
  console.log('publish baqi包和baqi-xxx包')
  const publishArr = []
  for (let i = 0; i < modules.length; i++) {
    console.log('正在publish ' + modules[i])
    const cdPath = join(cwd, '../' + modules[i])
    publishArr.push(execCmd('cd ' + cdPath + ' && npm publish --registry http://registry.npmjs.org'))
  }
  await Promise.all(publishArr) // 不catch，报错就中断
  console.log('将baqi-xxx包中引入baqi的方式替换成file引入')
  for (let i = 1; i < modules.length; i++) {
    replaceImportToFile(modules[i])
  }
  console.log('替换所有项目引入baqi包和baqi-xxx包的版本号')
  for (let i = 0; i < projects.length; i++) {
    replaceImport(projects[i])
  }


}
