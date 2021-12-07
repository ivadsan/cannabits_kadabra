const fs = require('fs');

console.time()
console.log('Start reading files...')

const files = fs.readdirSync("./src/assets")
let contents = []

for(let i = 0; i < files.length; i++){
  let path = `./src/assets/${files[i]}/README.md`
  let file = fs.readFileSync(path, 'utf-8');
  let arrayFile = file.split("\n")
  let pathUrl = `/assets/${files[i]}/README.md`
  
  let content = {}
  content.path = pathUrl
  
  for(let i = 0; i < 4; i++){
    let line = arrayFile[i].split('@param')
    if(line.length > 1){
      let item = line[1].split("$$")
      let key = item[0].trim()
      let value = item[1].trim()
      content[key] = value
    }
  }
  contents.push(content)
}

fs.writeFileSync("./public/directory.txt", JSON.stringify(contents))
console.log('End reading files...')
console.timeEnd()