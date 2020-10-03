const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", (req, res) => {
    console.log(req.body)
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if(err) throw err;
            res.json({
                error: true,
                data: null,
                message: "Unable to retrieve notes.",
            });
        const updatedData = JSON.parse(data);
        req.body.id = updatedData.length + 1;
        updatedData.push(req.body);
        fs.writeFile("./db/db.json", JSON.stringify(updatedData), (err) => {
            if (err) throw err;
        });
    })
});

app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        const updatedData = JSON.parse(data)
        const noteArray = updatedData.filter(function (data) {
            return data.id != req.params.id
        });
        fs.writeFile("./db/db.json", JSON.stringify(noteArray), (err, data) => {
            if (err) throw err;
        });
        res.json(JSON.parse(data));
        });
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});
  
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
    console.log(`Currently running on http://localhost:${PORT}`);
});