const fs = require('fs');

console.time()
console.log('Start reading files...')

const files = fs.readdirSync("./public/notes")
let contents = []

if(files.length > 0){
  for(let i = 0; i < files.length; i++){
    if(files[i] !== ".DS_Store"){
      let path = `./public/notes/${files[i]}/README.md`
    let file = fs.readFileSync(path, 'utf-8');
    let arrayFile = file.split("\n")
    let pathUrl = `/notes/${files[i]}/README.md`
    
    let content = {}
    content.path = pathUrl
    
    for(let i = 0; i < 3; i++){
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
    
  }
}

fs.writeFileSync("./public/directory.txt", JSON.stringify(contents))
console.log(`${contents.length} files processed`)

console.log('End reading files...')
console.timeEnd()