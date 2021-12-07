import React, {useState} from 'react'
import {Link} from "@reach/router"

export default function Section({group, contents}) {

  const [isOpen, setIsOpen] = useState(false)

  function getTitlesByGroup(group, contents){

    let result = []
    contents.forEach((item)=>{
      if(group === item.group){
        const {title, path} = item
       result.push({title,path})
      }
    })

    
    return(
      <ul className={`list ${isOpen ? "active" : ""}`} >
        {result.map((item, index)=><li key={index}><Link to={"notes"} state={{path: item.path}} >{item.title}</Link></li>)}
      </ul>
    )

  }
  
  const handleToggle = () => {
    console.log(isOpen)
    setIsOpen(!isOpen)
  }
  
  return (
    <>
    <section className="group" onClick={handleToggle}>{group}</section>
    {getTitlesByGroup(group, contents)}
  </>
  )
}
