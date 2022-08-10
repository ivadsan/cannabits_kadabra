import React, {useEffect} from 'react'

export default function Loading() {
  useEffect(()=>{
    const body = document.querySelector("body")
    body.style.overflow = "hidden"
    return ()=>{
      body.style.overflow = "auto"
    }
  },[])

  return (
    <div className='overload'>
      <div className="loadingio-spinner-spinner-ttousbtufan">
        <div className="ldio-rncd59grdb">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
