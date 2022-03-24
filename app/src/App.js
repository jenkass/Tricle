import './App.css';
import React, {useEffect, useState} from "react";
import Post from './Post';
import {Button, Modal, makeStyles, Input} from '@material-ui/core';
import ImageUpload from './ImageUpload';

const BASE_URL = 'http://localhost:8000/'

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    width: 400,
    border: "2px solid white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

function App() {

  const classes = useStyles();

  const [posts, setPosts] = useState([]); 
  const [OpenSignIn, setOpenSignIn] = useState(false);
  const [OpenSignUp, setOpenSignUp] = useState(false);
  const [modalStyle, setModalStyle] = useState(getModalStyle);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [authToken, setAuthToken] = useState(null);
  const [authTokenType, setAuthTokenType] = useState(null);
  const [userId, setUserId] = useState('');


  useEffect(() => {
    setAuthToken(window.localStorage.getItem('authToken'));
    setAuthTokenType(window.localStorage.getItem('authTokenType'));
    setUsername(window.localStorage.getItem('username'));
    setUserId(window.localStorage.getItem('userId'));
  }, [])

  useEffect(() =>  {
    authToken
      ? window.localStorage.setItem('authToken', authToken)
      : window.localStorage.removeItem('authToken', authToken);
    authTokenType
      ? window.localStorage.setItem('authTokenType', authTokenType)
      : window.localStorage.removeItem('authTokenType', authTokenType);
    username
      ? window.localStorage.setItem('username', username)
      : window.localStorage.removeItem('username', username);
    userId
      ? window.localStorage.setItem('userId', userId)
      : window.localStorage.removeItem('userId', userId);
  }, [authToken, authTokenType, userId])

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


  const signIn = (event) => {
    event?.preventDefault();
    let formData = new FormData();
    formData.append('username', username)
    formData.append('password', password)

    const requestOptions = {
      method: 'POST',
      body: formData
    }

    fetch(BASE_URL + 'login', requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then(data => {
      setAuthToken(data.access_token)
      setAuthToken(data.token_type)
      setUserId(data.user_id)
      setUsername(data.username)
    })
    .catch(error => {
      alert(error);
    })
    
    setOpenSignIn(false);
  }

  const signOut = (event) => {
    setAuthToken(null)
    setAuthToken(null)
    setUserId('')
    setUsername('')
  }


  const signUp = (event) => {
    event?.preventDefault();
    const json_str = JSON.stringify({
      username: username,
      email: email,
      password: password
    })

    const requestOptions = {
      method: 'POST',
      headers: {"Content-type": "application/json"},
      body: json_str
    }

    fetch(BASE_URL + 'user/create', requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then(data => {
      signIn();
    })
    .catch(error => {
      alert(error);
    })
    
    setOpenSignUp(false);
  }

  return (
    <div className="app">

      <Modal open={OpenSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signin">
            <center>
              <img className="app_header_image" src="https://www.pnglib.com/wp-content/uploads/2021/02/letter-t-png_60212646d8d2a-768x792.png" alt="Tricle"/>
            </center>
            <Input placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

      <Modal open={OpenSignUp} onClose={() => setOpenSignUp(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signin">
            <center>
              <img className="app_header_image" src="https://www.pnglib.com/wp-content/uploads/2021/02/letter-t-png_60212646d8d2a-768x792.png" alt="Tricle"/>
            </center>
            <Input placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button type="submit" onClick={signUp}>Sign Un</Button>
          </form>
        </div>
      </Modal>

      <div className="app_header">
        <img className="app_header_image" src="https://www.pnglib.com/wp-content/uploads/2021/02/letter-t-png_60212646d8d2a-768x792.png" alt="Tricle"/>
        <h4 className="app_logoname">Tricle</h4>
        {authToken ? (
            <Button onClick={() => signOut()}>Logout</Button>
          ) : (
            <div>
              <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
              <Button onClick={() => setOpenSignUp(true)}>Sign Up</Button>
            </div>
          )
        }
      </div>
      <div className="app_posts">
      {
        posts.map(post => (
          <Post post={post} authToken={authToken} authTokenType={authTokenType}/>
        ))
      }
      </div>

      {authToken ? (
        <ImageUpload authToken={authToken} authTokenType={authTokenType} userId={userId}/>
      ) : (
        <h3>Yon need to login to upload</h3>
      )}
    </div>
    
  );
}

export default App;
