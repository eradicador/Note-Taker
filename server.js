// requires express to interact with the front end
const express = require("express");
const apiroutes = require("./routes/apiroutes");
const htmlroutes = require("./routes/htmlroutes");

const app = express();

const PORT = process.env.PORT || 3000;
//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiroutes);
app.use("/html", htmlroutes);
app.use(htmlroutes);


app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
    console.log("Ready on port 3000");
})