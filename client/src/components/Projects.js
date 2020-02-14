import React from 'react';
import {Link} from 'react-router-dom'

function Projects(props) {
    return (
        <div>
            {props.projects.map(project => {
            // console.log(user)
          return <Link to={`/projects/${project.id}`}>
            <h1>Project: {project.name}</h1>
            <p>{project.description}</p>
          </Link>
        })}
        </div>
    );
}

export default Projects;