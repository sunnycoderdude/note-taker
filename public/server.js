// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require ("fs"); 
const util = require ("util");
const writeFileAsync = util.promisify(fs.writeFile); 
const readFileAsync = util.promisify(fs.readFile);

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
  
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
    console.log(__dirname);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});