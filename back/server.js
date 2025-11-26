import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger le JSON
const dataPath = path.join(__dirname, "data", "categories.json");
const rawData = fs.readFileSync(dataPath);
const db = JSON.parse(rawData);

// Route : /all-categories
app.get("/all-categories", (req, res) => {
    res.json(db.categories);
});

// Route : /visible-categories
app.get("/visible-categories", (req, res) => {
    res.json(db.visibleCategories);
});

// Lancement serveur
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
});