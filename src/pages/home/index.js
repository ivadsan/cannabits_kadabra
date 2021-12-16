import React, {useState, useEffect} from 'react'
import Section from '../../components/Section'
import Loading from '../../components/Loading'

export default function Home() {

  const [contents, setContents]= useState([])
  const [groups, setGroups]= useState([])
  const [loading, setLoading] = useState(true)

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
      setLoading(false)     
    })
  },[])

  function sortContentsByTitle(x,y){
    if (x.title < y.title) {return -1;}
    if (x.title > y.title) {return 1;}
    return 0;
  }  
  
  return (
    <div className="container">
      {loading ? <Loading /> : (
        <>
          {groups.length > 0 ? (groups.map((group, index)=>(<Section key={index} group={group} contents={contents} />))):
          (
            <div className="empty">
              <div className="empty__message">
                There are no notes loaded in the application<br/> Check the documentation to get started !!!
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
