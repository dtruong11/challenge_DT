// Welcome to camping world 
const fs = require('fs')
const path = require('path')
let origin = path.join(__dirname, 'input1.txt')
const content = fs.readFileSync(origin, 'utf-8').trim().split('\n')
const { Queue } = require('./util')

const maxCampers = (content) => {
  let info = content.shift().split(',').map(el => parseInt(el))
  let matrix = content.map(el => el.split(''))
  let rows = info[0]
  let cols = info[1]
  let distance = info[2]
  let visited = []
  let tents = []
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === 'X') {
        visited[i] = []
        visited[i][j] = true
      }
      else {
        visited[i] = []
        visited[i][j] = false
      }
      if (matrix[i][j] === 'T') {
        tents.push({ row: i, col: j })
      }
    }
  }

  console.log('tents', tents)

  let q = new Queue()
  let fCounter = 0
  let wCounter = 0
  let tent = tents.shift()
  q.add(tent)
  visited[tent.row][tent.col] = true
  while (q.peek()) {
    let cur = q.pop()
    let { row, col } = cur
    // Food found
    console.log('matrix[row][col]', row, col, matrix[row][col])
    if (matrix[row][col] === 'F') {
      console.log('found food')
      return fCounter
    }

    // Water found 
    if (matrix[row][col] === 'W') {
      console.log('found water')
      return wCounter
    }

    // Moving up 
    if (row - 1 >= 0 && visited[row - 1][col] === false) {
      q.add({ row: row - 1, col: col })
      fCounter++
      visited[row - 1][col] = true
    }

    // Moving down 
    if (row + 1 < rows && visited[row + 1][col] === false) {
      q.add({ row: row + 1, col })
      fCounter++
      visited[row + 1][col] = true
    }

    // Moving left
    if (col - 1 >= 0 && visited[row][col - 1] === false) {
      q.add({ row: row, col: col - 1 })
      fCounter++
      visited[row][col - 1] = true
    }

    // // Moving right 
    if (col + 1 >= 0 && visited[row][col + 1] === false) {
      q.add({ row: row, col: col + 1 })
      fCounter++
      visited[row][col + 1] = true
    }
  }
  return fCounter ? fCounter : 0
}

maxCampers(content)
/*
  A camper:
    1F, 1W, 1T
    T -> F <= D
    T -> W <= D

  T: source
  F/ W: destination
*/
