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
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// API routes
// get notes
app.get("/api/notes", function(req, res){
    fs.readFile("db/db.json", "utf8", function(err, notes){
        if(err) throw err;
        console.log(typeof res)
        res.json(JSON.parse(notes))
    })
});

// post notes
app.post("/api/notes", async function(req, res){
  let newNote = req.body;
    try {
      let notes = await readFileAsync("db/db.json", "utf8");
      notes = JSON.parse(notes);
      notes.push(newNote);
      for (let i = 0; i < notes.length; i++){
        notes[i].id= i + 1;
      }      
        await writeFileAsync("db/db.json", JSON.stringify(notes, null, 2));
        res.json(newNote);
    } catch(err){
        throw err
    }
})

app.delete("/api/notes/:id", function(req, res) {

  let oldNote = parseInt(req.params.id);
  let notes = JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
  const newNotes = notes.filter(note => note.id !== oldNote);
  const notesString = JSON.stringify(newNotes);
  fs.writeFile("db/db.json", notesString, "utf8", (err, data) => {
    if (err) throw err;
    console.log("note has been deleted");
  });
  res.json(newNotes);
});

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});