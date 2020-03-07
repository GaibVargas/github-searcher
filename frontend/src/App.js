import React, { useState } from 'react';

import api from './services/api';
import axios from 'axios';
import './style.css';

function App() {
  const [input, setInput] = useState('');
  const [show, setShow] = useState("true");
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);

  async function getUser() {
    if (input === '') return;
    const { data } = await api.get(`/user/${input}`);

    setUser(data.user);
    setRepos([]);
    setShow("false");
  }

  async function getRepos() {
    const { data } = await axios.get(user.repos_url);

    setRepos(data);
  }
  
  return (
    <div className="App">
    
      <header><h1>Github Users Searcher</h1></header>
      
      <div className="input">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Username" />
        <button onClick={() => getUser()}>Search</button>
      </div>

      <div className="response" hide={show}>
      { user.name !== undefined ? (
        <>
          <div className="response-header">
            <img src={user.avatar_url} alt="Avatar"/>
            { user.name ? <h3>{user.name}</h3> : <h3>{user.login}</h3> }
          </div>
          <div className="response-repos">
            <button onClick={() => getRepos()}>Get the user repositories</button>
            { repos &&
              repos.map(repo => (
                <p key={repo.id}><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></p>
              ))
            }
          </div>
        </>
        ) : (
        <div className="response-header">
          <p>User not found</p>
        </div>
        )
      }
      </div>

    </div>
    );
  }
  
  export default App;
  