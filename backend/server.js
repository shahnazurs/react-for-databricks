import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";

import cors from 'cors'

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors())
app.use(express.json())

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

app.post("/api/employees", async (req, res) => {
  try {
    const { ename, email, sal } = req.body;
    const result = await pool.query(
      `INSERT INTO public.employees(ename,email,sal) values($1, $2, $3) RETURNING *`, [ename, email, sal]);

    res.status(201).json(result.rows[0]);
  }
  catch (erro) {
    console.error("Create employee failed:", error);

    res.status(500).json({
      error: "Failed to create employee"
    });
  }

})

app.delete("/api/employees/:empno", async (req, res) => {
  console.log("Deleting.....")
  console.log(req.params)
  const result = await pool.query(
    "DELETE FROM public.employees where empno = $1 RETURNING *", [req.params.empno]
  );

  if (result.rowCount == 0) {
    return res.status(404).json({
      error: "Employee not found"
    })
  }
  res.json({
    message: "Employee delete successfully",
    employee: result.rows[0]
  })
})

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