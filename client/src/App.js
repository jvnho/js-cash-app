import React, {useEffect, useState} from 'react'
import Container from './component/Container'

function App(){
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/datas/")
      .then(response => response.json())
      .then(data => {setBackendData(data)})}, []);

  var rendered;
  if(typeof backendData.companyName === "undefined")
    rendered = <p>Loading...</p>;
  else 
    rendered = <Container data={backendData}/>;

  return(
    rendered
  )
}

export default App