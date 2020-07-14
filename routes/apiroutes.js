const router = require("express").Router()

const Note = require("../db/Note.js")
// argument
router.get("/notes", (req, res) => {
    Note.getNotes()
        .then((notes) => res.json(notes))
        .catch((err) => res.status(500).json(err));
});
router.post("/notes", (req, res) => {
    Note.addNote(req.body)
    .then(note => res.json(note))
    .catch((err) => res.status(500).json(err));
});

router.delete("/notes/:id", (req, res) => {
    Note.
}
)




module.exports
