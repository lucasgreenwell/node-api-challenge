import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom'

import Projects from "./components/Projects";
import Project from "./components/Project";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/projects")
      .then(res => {
        // console.log(res.data)
        setProjects(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" render={props => {
             return <Projects projects={projects}/> 
        }}/>
        <Route path="/projects/:id" render={props => {
          return <Project id={props.match.params.id}/>
        }}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
