const router = require("express").Router();
const store = require("../db/taker");

// GET "/api/notes" responds with all notes from the database
router.get("/notes", function (req, res) {
  store
    //call getNotes
    .getNotes()
    //then array that came back, res.json is sending back the object
    .then(notes => res.json(notes))
    //if it hits an error sends it to the front end 
    .catch(err => res.status(500).json(err));
});

router.post("/notes", (req, res) => {
  store
    .addNote(req.body)
    .then((note) => res.json(note))
    //if it hits an error sends it to the front end 
    .catch(err => res.status(500).json(err));
});

//deletes the note with an id equal to req.params.id
router.delete("/notes/:id", function (req, res) {
  store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    //if it hits an error sends it to the front end 
    .catch(err => res.status(500).json(err));
});

module.exports = router;
