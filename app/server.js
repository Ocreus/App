const express = require("express");

const db = require("./config/db");

db();

const app = express();

app.use(express.json({ exntended: false }));

app.use("/api/auth", require("./server/api/auth"));
app.use("/api/register", require("./server/api/register"));
app.use("/api/profile", require("./server/api/profile"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server running..."));
