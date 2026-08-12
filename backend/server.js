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
app.use(cors()) // Cross Origin Resource Sharing
app.use(express.json()) // Parse JSON body and keep it under request body

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
      `SELECT empno,ename,email,sal,d.deptno, d.dname as dname FROM 
          public.employees as e
          join 
          public.department as d
          on (e.deptno=d.deptno)
        order by empno`
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Lakebase query failed:", error);

    res.status(500).json({
      error: "Database query failed"
    });
  }
});

app.get("/api/departments", async (req, res) => {
  try {

    const result = await pool.query(
      `SELECT * FROM public.department order by dname`  
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
    const { ename, email, sal, deptno } = req.body;
    const result = await pool.query(
      `INSERT INTO public.employees(ename,email,sal,deptno) values($1, $2, $3, $4) RETURNING *`, [ename, email, sal, deptno]);

    res.status(201).json(result.rows[0]);
  }
  catch (erro) {
    console.error("Create employee failed:", error);

    res.status(500).json({
      error: "Failed to create employee"
    });
  }

})

app.put("/api/employees/:empno", async (req,res)=>{
  console.log(req.body)
  console.log(req.params)

  const {ename, email,sal, deptno} = req.body

  const result= await pool.query(
    "UPDATE public.employees set ename=$1, email=$2, sal=$3, deptno=$4 where empno=$5",[ename,email,sal,deptno,req.params.empno]
  )
  if(result.rowCount == 0){
    return res.status(404).json({
      error: "Unable to update"
    })
  }
  console.log(result);
  res.json({
    message: "Successfully updated"
  })
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
app.get("/", (req, res) => {
  console.log("Root......")
  res.sendFile(
    path.join(frontendPath, "index.html")
  );
});

app.use((req,res)=>{
  res.status(404).send("File not found....")
})

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Application running on port ${PORT}`);
});