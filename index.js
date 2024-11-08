#!/usr/bin/env node
import templatePackageJson from './template/package.json' with { type: 'json' }
import { cpSync } from 'node:fs'

const projectNameInput = process.argv.at(2)
if (!projectNameInput) {
  console.error('project name is required')
  process.exit(1)
}

const useCurrentDirectory = projectNameInput === '.'
const cwd = process.cwd()

const projectName = useCurrentDirectory ? cwd.split('/').at(-1) : projectNameInput
const projectPath = `${cwd}/${useCurrentDirectory ? '' : projectName}`

const newPackageJson = structuredClone(templatePackageJson)
newPackageJson.name = projectName

cpSync(`${cwd}/template`, projectPath, { recursive: true })

console.log(`${projectName} successfully created!`)
