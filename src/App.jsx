import logo from './logo.svg';
import './App.css';
import React from 'react';
function App() {
  const [user, setuser] = React.useState({
    username:'',
    password:''
  });
  function login(){
    fetch("http://localhost:4500/authenticate",{
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user) // body data type must match "Content-Type" header
    })
    .then((res)=>{
      return res.json()
    })
    .then(data=>{
      console.log("response from backend",data);
      window.localStorage.setItem('token',data.token)
    })
  }
  function getStudents(){
    fetch("http://localhost:4500/students",{
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':window.localStorage.getItem('token')
      }
    })
    .then((res)=>{
      return res.json()
    })
    .then(data=>{
      console.log("students from backend",data);
    })
  }
  return (
    <div className="App">
      <div>
        <input type="text" name='username' onChange={(e)=>{setuser({...user,username:e.target.value})}}/>
        <input type="text" name='password' onChange={(e)=>{setuser({...user,password:e.target.value})}}/>
        <button type='button' onClick={login}>login</button>
        <button onClick={getStudents}>Get Students Data</button>
      </div>
    </div>
  );
}

export default App;
