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

// Basic route that sends the user first to the AJAX Page
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
  
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
    console.log(__dirname);
});

//create API routes 

app.get("/api/notes", function(req, res) {
    fs.readfile("journal.json", "utf8", function(err, notes) {
        if (err) throw err;
        res.json(JSON.parse(notes))
    });
});

// app.get("/api/reservations", function(req, res){
//     fs.readFile("reservations.json", "utf8", function(err, reservations){
//         if (err) throw err;
//         res.json(JSON.parse(reservations))
//     })
// })

// app.get("/api/waitlist", function(req, res){
//     fs.readFile("waitlist.json", "utf8", function(err, waitlist){
//         if (err) throw err;
//         res.json(JSON.parse(waitlist))
//     })
// })
  
// app.post("/api/reservations", async function (req, res){
//   let newReservation = req.body;
//   try{
//     let reservations = await readFileAsync ("reservations.json", "utf8");
//     reservations = JSON.parse(reservations);
//     if (reservations.length >= 5){
//       let waitlist = await readFileAsync ("waitlist.json", "utf8"); 
//       waitlist = JSON.parse(waitlist);
//       newReservationArray= waitlist.push(newReservation);
        
//       await writeFileAsync("waitlist.json", JSON.stringify(waitlist));
//       res.json(newReservation);

//     }
//     else {
//       newReservationArray= reservations.push(newReservation);
        
//       await writeFileAsync("reservations.json", JSON.stringify(reservations));
//       res.json(newReservation);
//     }
   
// } catch (err){
//     throw(err);
// }

// })





// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});