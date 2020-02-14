const express = require("express");
const db = require("./data/helpers/projectModel");

const router = express.Router();

//returns all projects
router.get('/', (req, res) => {
    db.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "Look man, I'm really sorry. It's my first day as a server."})
        })
})

//returns one project by id
router.get('/:id', (req, res) => {
    db.get(req.params.id)
        .then(project => {
            if (project){
                res.status(200).json(project)
            } else {
                res.status(404).json({errorMessage: 'project aint here dude'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "Look man, I'm really sorry. It's my first day as a server."})
        })
})

//returns one project's actions by id
router.get('/:id/actions', (req, res) => {
    db.getProjectActions(req.params.id)
        .then(projectActions => {
            if (projectActions.length){
                res.status(200).json(projectActions)
            } else {
                res.status(404).json({errorMessage: 'project aint got no actions dude'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "Look man, I'm really sorry. It's my first day as a server."})
        })
})

//inserts one project into the db
router.post('/', (req, res) => {
    if(!req.body.name || !req.body.description){
        res.status(400).json({errorMessage: "You gotta gimme the deets"})
    } else {
        db.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "Look man, I'm really sorry. It's my first day as a server."})
        })
    }
})

//removes one project from the db
router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
        .then(num => {
            if (num) {
                res.status(200).json({message:"we got him boys."})
            }
            else{
                res.status(404).json({errorMessage: "project aint here dude"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "Look man, I'm really sorry. It's my first day as a server."})
        })
})

//edits one project in the db
router.put('/:id', (req, res) => {
    db.update(req.params.id, req.body)
        .then(num => {

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "Look man, I'm really sorry. It's my first day as a server."})
        })
})


//endpoints dawwg

module.exports = router