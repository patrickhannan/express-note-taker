const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", (req, res) => {
    console.log(req.body)
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if(err) {
            console.log(err);
            return res.json({
                error: true,
                data: null,
                message: "Unable to retrieve notes.",
            });
        }
        const updatedData = JSON.parse(data);
        updatedData.push(req.body);
        fs.writeFile("./db/db.json", JSON.stringify(receivedData), (err) => {
            if (err) throw err;
            res.json({
                error: false,
                data: updatedData,
                message: "Successfully added new note."
            })
        });
    })
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, () => {
    console.log(`Currently running on http://localhost:${PORT}`);
});