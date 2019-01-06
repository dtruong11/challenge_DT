// Welcome to camping world 
const fs = require('fs')
const path = require('path')
let origin = path.join(__dirname, 'input1.txt')
const content = fs.readFileSync(origin, 'utf-8').trim().split('\n')

let info = content.shift().split(',').map(el => parseInt(el))
let rows = info[0]
let cols = info[1]
let distance = info[2]
let matrix = content.map(el => el.split(''))
console.log(rows, cols, distance, matrix)