import React, {useEffect, useState} from 'react'

function App(){
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/datas/").then(
      response => response.json()
    ).then(
      data =>{
        setBackendData(data)
      }
    )
  }, [])

  return(
    <div>
      {(typeof backendData.companyName === "undefined") ? (
        <p>Loading...</p>
      ) :
      <p>{backendData.companyName}</p>}
    </div>
  )
}

export default App