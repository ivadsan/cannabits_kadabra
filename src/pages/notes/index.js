import React, {useState, useEffect} from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { redirectTo } from "@reach/router"
import Loading from '../../components/Loading'

export default function Notes({location}) {

  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  
  useEffect(()=>{
    let path =location.state?.path 
    if(!path){
      path = localStorage.getItem("path")
    }
    if(!path){
      setLoading(false)
      redirectTo(location.origin)
    }
    
    localStorage.setItem("path",path)
    
    fetch(path)
    .then((res)=>res.text())
    .then((content)=>{
      setContent(content)
      setLoading(false)
    })
  },[location])

  return (
    <>
      {loading && (<Loading />)}
      <div className="container">
        <div className="viewer">
          <ReactMarkdown remarkPlugins={[remarkGfm]} children={content}/>
        </div>
      </div>        
    </>
  )
}
