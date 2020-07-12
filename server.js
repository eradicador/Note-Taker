const express = require("express");
const e = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

//set up routes
app.GET/

app.post("/api/notes", (req,  res) => {
const noteObj = req.body;
noteObj.id = 3;

})



app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`),
})
