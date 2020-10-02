const express = require("express");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/notes", (req, res) => {
    console.log(req.body)
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if(err) throw err;
        console.log(data);
        const updatedData = JSON.parse(data);
        updatedData.push(req.body);
        console.log(updatedData);

    })
  });

app.listen(PORT, () => {
    console.log(`Currently running on http://localhost:${PORT}`);
});