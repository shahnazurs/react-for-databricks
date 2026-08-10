import "dotenv/config";

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || process.env.DATABRICKS_APP_PORT || 8000;

const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
});

// API
app.get("/api/employees", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM public.employees LIMIT 100"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Lakebase query failed:", error);

    res.status(500).json({
      error: "Database query failed"
    });
  }
});

// React production build
const frontendPath = path.join(
  __dirname,
  "../frontend/build"
);

app.use(express.static(frontendPath));

// React client-side routing
app.get("/*splat", (req, res) => {
  res.sendFile(
    path.join(frontendPath, "index.html")
  );
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Application running on port ${PORT}`);
});