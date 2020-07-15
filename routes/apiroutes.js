const router = require("express").Router()
const Note = require("../db/Note.js")

// argument
router.get("/notes", (req, res) => {
    //call Note.getNotes
    Note.getNotes()
    //then array that came back, res.json is sending back the object
        .then((notes) => res.json(notes))
        //if it hits an error sends it to the front end 
        .catch((err) => res.status(500).json(err));
});
router.post("/notes", (req, res) => {
    Note.addNote(req.body)
    .then(note => res.json(note))
    .catch((err) => res.status(500).json(err));
});

router.delete("/notes/:id", (req, res) => {
    Note.deleteNote(req.body)
    .then(note => res.json(note))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
