import './App.css';
import React, {useEffect, useState} from "react";

const BASE_URL = 'http://localhost:8000'

function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() =>  {
    fetch(BASE_URL + "/posts/all")
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw response
    })
    .then(data => {
      setPosts(data)
    })
    .catch(error => {
      console.log(error);
      alert(error)
    })
  }, [])

  return (
    "hello world!"
  );
}

export default App;
