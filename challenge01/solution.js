const fs = require('fs')
const path = require('path')
let origin = path.join(__dirname, 'input.txt')
const content = fs.readFileSync(origin, 'utf-8')
const input = JSON.parse(content)

const addNewNode = (input) => {
  let n = input.newNode
  if (!n) throw new Error('There is no new node to add')
  let vertices = input.nodes
  let edges = input.edges
  let nodeswPath = {}
  let noPaths = {}

  if (vertices.length === 0) throw new Error('Add some nodes to the graph')
  if (edges.length === 0) throw new Error('Add some edges between nodes')

  edges.map(el => nodeswPath[el[0]] = true)
  vertices.map(el => {
    if (!nodeswPath.hasOwnProperty(el)) noPaths[el] = true
  })

  for (let node in noPaths) {
    edges.push([parseInt(node), n])
  }

  vertices.push(n)
  return {
    "nodes": vertices,
    "edges": edges
  }
}

console.log(addNewNode(input))