#!/usr/bin/env node
// eslint-disable-next-line
import templatePackageJson from './template/package.json' with { type: 'json' }
import { cpSync } from 'node:fs'

const projectNameInput = process.argv.at(2)
if (!projectNameInput) {
  console.error('project name is required')
  process.exit(1)
}
const useCurrentDirectory = projectNameInput === '.'

const projectName = useCurrentDirectory ? process.cwd().split('/').at(-1)! : projectNameInput
const projectPath = `${process.cwd()}/${useCurrentDirectory ? '' : projectName}`

const newPackageJson = structuredClone(templatePackageJson)
newPackageJson.name = projectName

cpSync('./template', projectPath, { recursive: true })

console.log(`${projectName} successfully created!`)
