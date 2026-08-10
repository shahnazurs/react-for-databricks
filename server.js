const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

// Serve React static files
app.use(express.static(path.join(__dirname, "build")));

// Handle React client-side routing
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`React app running on port ${PORT}`);
});