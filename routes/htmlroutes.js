// const path = require('path');
const path = require('path');
const app = require("express").Router()

// Display notes.html when /note is accessed
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

// Display index.html when all other routes are accessed
app.get("/", function(req,res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;