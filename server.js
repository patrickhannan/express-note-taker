const express = require("express");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/notes", (req, res) => {
    
  });

app.listen(PORT, () => {
    console.log(`Currently running on http://localhost:${PORT}`);
});