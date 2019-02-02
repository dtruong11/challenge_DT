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
  let visited = new Map()
  let tents = []
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === 'X') visited[`${i}*${j}`] = true
      else visited[`${i}*${j}`] = false

      if (matrix[i][j] === 'T') {
        tents.push({ row: i, col: j })
      }
    }
  }

  let q = new Queue()
  let fCounter = 0
  let wCounter = 0
  let tent = tents.shift()
  q.add(tent)
  visited.set({ row: tent.row, col: tent.col }, true)
  while (q.peek()) {
    let cur = q.pop()
    let { row, col } = cur
    console.log('cur', cur)
    // Food found
    if (matrix[cur.row][cur.col] === 'F') {
      console.log('found food')
      return fCounter
    }

    // Water found 
    if (matrix[cur.row][cur.col] === 'W') {
      console.log('found water')
      return wCounter
    }

    // Moving up 
    if (cur[row - 1] >= 0 && visited.get({ row: cur[row - 1], col: cur.col }) === false) {
      q.add({ row: cur[row - 1], col: cur.col })
      fCounter++
      visited.set({ row: cur[row - 1], col: cur.col }, true)
    }

    // Moving down 
    if (cur[row + 1] < rows && visited.get({ row: cur[row + 1], col: cur.col } === false)) {
      q.add({ row: cur[row + 1], col: cur.col })
      fCounter++
      visited.set({ row: cur[row + 1], col: cur.col }, true)
    }

    // Moving left
    if (cur[col - 1] >= 0 && visited.get({ row: cur.row, col: cur[col - 1] } === false)) {
      q.add({ row: cur.row, col: cur[col - 1] })
      fCounter++
      visited.set({ row: cur.row, col: cur[col - 1] }, true)
    }

    // Moving right 
    if (cur[col + 1] >= 0 && visited.get({ row: cur.row, col: cur[col + 1] } === false)) {
      q.add({ row: cur.row, col: cur[col + 1] })
      fCounter++
      visited.set({ row: cur.row, col: cur[col + 1] }, true)
    }
  }
  console.log('fCounter', fCounter)
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
