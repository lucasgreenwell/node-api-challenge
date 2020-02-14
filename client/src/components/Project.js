import React, { useState, useEffect } from "react";
import axios from "axios";

const Project = props => {
    const [project, setProject] = useState({
        actions: []
    })


    useEffect(() => {
        axios.get(`http://localhost:5000/projects/${props.id}`)
        .then(res => {
            setProject(res.data)
        })
        .catch(err => console.log(err))
    }, [])

        console.log(project)
    return (
        <div>
            <h1>{project.name}</h1>
            <p>Actions</p>
            {project.actions.map(action => {
                return <div>
                    <p>{action.description}</p><br /><p>{action.notes}</p>
                </div>
            })}
        </div>
    )
}

export default Project