#!/usr/bin/env node
const program = require('commander')
const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
const chalk = require('chalk')

function handleInstallationErrors (error, stdout, stderr) {
  console.log(chalk.red(`stdout: ${stdout}`))
  if (stderr !== null) {
    console.log(chalk.red(`stderr: ${stderr}`))
  }
  if (error !== null) {
    console.log(chalk.red(`exec error: ${error}`))
  }
}

function updatePackage (manager, framework) {
  const defaultPackages = ['webpack', 'babel-core', 'webpack-dev-server', 'babel-preset-es2015', 'babel-loader']
  const frameworkPackages = framework === 'preact' ? ['preact'] : ['react', 'react-dom']
  const installDevCmd = manager === 'yarn' ? 'yarn add --dev' : 'npm install --save-dev'
  const installCmd = manager === 'yarn' ? 'yarn add' : 'npm install --save'

  console.log(chalk.green('Installing Default Dependencies'))
  exec(`${installDevCmd} ${defaultPackages.join(' ')}`, handleInstallationErrors)

  console.log(chalk.green('Installing Framework Dependencies'))
  exec(`${installCmd} ${frameworkPackages.join(' ')}`, handleInstallationErrors)

  if (framework === 'preact') {
    console.log(chalk.green('Installing More Dependencies For Preact'))
    exec(`${installDevCmd} babel-plugin-transform-react-jsx`, handleInstallationErrors)
  }
}

function setUpTemplate (framework) {
  
}

program
  .arguments('<directory>')
  .option('-mngr, --manager <manager>', 'Which package manager do you want to use ( npm / yarn )')
  .option('-fwk, --framework <framework>', 'The framework that you want to use')
  .option('-entry, --entrypoint <entrypoint>', 'Entry point for Webpack build')
  .action(function (directory) {
    if (fs.existsSync(path.join(directory, 'package.json'))) {
      updatePackage(program.manager, program.framework)
      setUpTemplate(program.framework, program.entrypoint)
    } else {
      console.log(chalk.red(`Error: No package.json found on ${directory}!`))
    }
  })
  .parse(process.argv)
