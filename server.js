require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRoutes = require("./routes/api");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI;
if (!MONGO) {
  console.error("Please set MONGO_URI in .env");
  process.exit(1);
}

mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.error("Mongo connect error:", err);
});

app.use("/api", apiRoutes);

app.get("/", (req, res) => res.send("Backend is running"));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
