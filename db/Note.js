const util = require("util");
const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Note {
    read() {
        return readFileAsync("db/db.json", "utf8")
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }

    getNotes() {
        return this.read().then(function (notes) {
            let readNotes = [];

            try {
                readNotes = readNotes.concat(JSON.parse(notes))
            } catch (error) {
                readNotes = [];
            }
            return readNotes;
        })
    }
    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("Title and text can't be blank")
        }
        var id = 100;

        const newNote = {
            title: title,
            text: text,
            id: id++
        }
        //the 3rd .then is gonna return an empty note, added a new note using our spread operator
        return this.getNotes().then((notes) => [...notes, newNote]).then(function (newNotesArray) { this.write(newNotesArray) }).then(() => newNote);



    }
    deleteNote(id) {
        // this function is gonna know what to filter all of the notes by id of array, return a new array minus the 1 that we dont want
        return this.getNotes().then((notes) => notes.filter((note) => note.id !== id)).then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports = new Note();
