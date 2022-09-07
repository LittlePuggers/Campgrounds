import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [ response, setResponse ] = useState([]);

  useEffect(
    () => { axios.get('http://localhost:3001/')
      .then( info => 
        {
          setResponse(info.data)
        } 
      )
    },
    []
  )

  return (
    <div className="App">
      <main className="App-main">

        {response.map((respuesta)=>{
          return(
            <li key={uuidv4()}><Link to={`/campground/${respuesta._id}`} >{respuesta.title} in {respuesta.location}</Link></li>
          )
        })}

      </main>
    </div>
  );
}

export default App;
