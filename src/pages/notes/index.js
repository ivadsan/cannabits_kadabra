import React, {useState, useEffect} from 'react'
import ReactMarkdown from 'react-markdown'

export default function Notes({location}) {

  const [content, setContent] = useState("")
  
  useEffect(()=>{
    const {state:{path}} = location
    console.log(path)

    fetch("./test.md")
    .then((res)=>res.text())
    .then((content)=>setContent(content))
    
  },[])
  return (
    <ReactMarkdown>{content}</ReactMarkdown>
  )
}
