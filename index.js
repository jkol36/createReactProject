#!/usr/bin/env node
require('./config')
let chalk = require('chalk')
let shell = require('shelljs')
let co = require('co')
let prompt = require('co-prompt')
let program = require('commander')
let name
let backend

program
  .arguments('<project>')
  .action(project => {
    if(!program.backend) {
      co(function *() {
        backend = yield prompt('backend: ')
        console.log(`project name: ${project}`)
        console.log(`backend you chose: ${backend}`)
        console.log('setting everything up...')
        console.log(chalk.bold.cyan(`creating a new directory for the project...`))
        shell.mkdir(`~/development/${project}`)
        console.log(chalk.bold.cyan(`cd ing into directory...`))
        shell.cd(`~/development/${project}`)
        console.log(chalk.bold.cyan(`cloning starter project from jon's github...`))
        shell.exec('git clone https://github.com/jkol36/react-starter-kit')
        console.log(chalk.bold.cyan('installing dependencies...'))
        shell.cd('./react-starter-kit')
        shell.exec('yarn')
        console.log(chalk.bold.cyan('dependencies installed ready for npm start!!'))
        console.log(chalk.bold.cyan(`project directory: ~/development/${project}/react-native-starter-kit`))
        if(backend === 'mongodb') {
          console.log(chalk.bold.cyan(`cloning rest api from jon's github`))
          shell.exec('git clone https://github.com/jkol36/restapi-mongo-starter-kit')
          console.log(chalk.bold.cyan('cding into rest api directory...'))
          shell.cd('./restapi-mongo-starter-kit')
          console.log(chalk.bold.cyan('running npm install'))
          shell.exec('yarn')
          console.log(chalk.bold.cyan('rest api ready'))
          console.log(chalk.bold.cyan(`run this: cd ~/development/${project}`))
        }
        process.exit()
      })
    }

  })
  .parse(process.argv)





