const fs = require('fs')
const content = fs.readFileSync('./input.txt', 'utf-8')
const input = JSON.parse(content)

const addNewNode = (input, n) => {
  let vertices = input.nodes
  let edges = input.edges

  if (vertices.length === 0) throw new Error('Add some nodes to the graph')
  if (edges.length === 0) throw new Error('Add some edges between nodes')
  let nodeswPath = edges.map(el => el[0]).filter((el, idx, arr) => arr.indexOf(el) === idx)
  let noPaths = vertices.filter(el => !nodeswPath.includes(el))
  noPaths.forEach(el => {
    edges.push([el, n])
  })
  vertices.push(n)
  return {
    "nodes": vertices,
    "edges": edges
  }
}

console.log(addNewNode(input, 3))