const express = require("express");
const db = require("./data/helpers/actionModel");

const router = express.Router();

//returns one action by id
router.get('/:id', (req, res) => {
    db.get(req.params.id)
        .then(action => {
            if (action){
                res.status(200).json(action)
            } else {
                res.status(404).json({errorMessage: 'action aint here dude'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "Look man, I'm really sorry. It's my first day as a server."})
        })
})

//inserts one action onto a project
router.post('/', (req, res) => {
    if(!req.body.notes || !req.body.description || !req.body.project_id){
        res.status(400).json({errorMessage: "You gotta gimme the deets"})
    } else {
        db.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "Look man, I'm really sorry. It's my first day as a server."})
        })
    }
})

//deletes an action by id
router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
        .then(num => {
            if (num) {
                res.status(200).json({message:"we got him boys."})
            }
            else{
                res.status(404).json({errorMessage: "action aint here dude"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "Look man, I'm really sorry. It's my first day as a server."})
        })
})

//edits one action in the db
router.put('/:id', (req, res) => {
    if(!req.body.notes || !req.body.description || req.body.project_id){
        res.status(400).json({errorMessage: "You gotta gimme the deets"})
    } else {
        db.update(req.params.id, req.body)
        .then(num => {
            if (num) {
                res.status(200).json(req.body)
            }
            else{
                res.status(404).json({errorMessage: "couldn't find that one but i looked for a while"})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage: "Look man, I'm really sorry. It's my first day as a server."})
        })
    }
})

module.exports = router