import React, {useState, useEffect} from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { redirectTo } from "@reach/router"
import Loading from '../../components/Loading'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dracula as Theme} from 'react-syntax-highlighter/dist/esm/styles/prism'

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
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            children={content}
            components={{
              code({node, inline, className, children, ...props}) {
                //const match = /language-(\w+)/.exec(className || '') || ['','javascript']
                const match = ['','javascript']
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={Theme}
                    language={match[1]} //match
                    PreTag="div"
                    {...props}
                    wrapLines={true}

                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
            />
        </div>
      </div>
    </>
  )
}
