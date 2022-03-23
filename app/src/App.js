import './App.css';
import React, {useEffect, useState} from "react";
import Post from './Post';
import {Button} from '@material-ui/core';

const BASE_URL = 'http://localhost:8000/'

function App() {

  const [posts, setPosts] = useState([]); 
  const [OpenSignIn, setOpenSignIn] = useState(false);
  const [OpenSignUp, setOpenSignUp] = useState(false);

  useEffect(() =>  {
    fetch(BASE_URL + "posts/all")
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw response
    })
    .then(data => {
      const result = data.sort((a, b) => {
        const t_a = a.timestamp.split(/[-T:]/);
        const t_b = b.timestamp.split(/[-T:]/);
        const d_a = new Date(Date.UTC(t_a[0], t_a[1]-1, t_a[2], t_a[3], t_a[4], t_a[5]));
        const d_b = new Date(Date.UTC(t_b[0], t_b[1]-1, t_b[2], t_b[3], t_b[4], t_b[5]));
        return d_b - d_a;
      })
      return result;
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
    <div className="app">
      <div className="app_header">
        <img className="app_header_image" src="https://www.pnglib.com/wp-content/uploads/2021/02/letter-t-png_60212646d8d2a-768x792.png" alt="Tricle"/>
        <h4 className="app_logoname">Tricle</h4>
        <div>
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpenSignUp(true)}>Sign Up</Button>

        </div>
      </div>
      <div className="app_posts">
      {
        posts.map(post => (
          <Post post={post}/>
        ))
      }
      </div>
    </div>
    
  );
}

export default App;
