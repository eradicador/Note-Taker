const util = require("util");
const fs = require("fs");
const { v1: uuidv1 } = require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Note {
  constructor() {
    this.lastId = 0;
  }

  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.read().then(notes => {
      let parsedNotes;

      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    // Increment `this.lastId` and assign it to `newNote.id`
    const newNote = { title, text, id: uuidv1()};

    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
      .then(notes => [...notes, newNote])
      .then(updatedNotes => this.write(updatedNotes))
      .then(() => newNote);
  }

  removeNote(id) {
    // this function is gonna know what to filter all of the notes by id of array, return a new array minus the 1 that we dont want
    return this.getNotes()
      .then(notes => notes.filter(note => note.id !==id))
      .then(filteredNotes => this.write(filteredNotes));
  }
}

module.exports = new Note();