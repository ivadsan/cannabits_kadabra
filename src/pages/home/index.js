import React, {useState, useEffect} from 'react'
import Section from '../../components/Section'

export default function Home() {

  const [contents, setContents]= useState([])
  const [groups, setGroups]= useState([])

  useEffect(()=>{    
    
    let arrayGroups = []

    fetch("./directory.txt")
    .then((res)=>res.text())
    .then((content)=> {
      const result = JSON.parse(content)

      const orderedContent = result.sort(sortContentsByTitle)
      setContents(orderedContent)

      result.forEach((item) => {
        const checkGroup = arrayGroups.includes(item.group)
        if(!checkGroup){
          arrayGroups.push(item.group)
        }
      })

      setGroups(arrayGroups.sort())      
    })
  },[])

  function sortContentsByTitle(x,y){
    if (x.title < y.title) {return -1;}
    if (x.title > y.title) {return 1;}
    return 0;
  }  
  
  return (
    <div className="container">
      {groups.length > 0 && groups.map((group, index)=>(<Section key={index} group={group} contents={contents} />))}
    </div>
  )
}
