import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routers
import plotBasicRouter from "./src/routers/plotBasic.router.js";
import plotDetailedRouter from "./src/routers/plotDetailed.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // allow all origins
    credentials: true,
  })
);

// Routes
app.use("/api/plots/basic", plotBasicRouter);
app.use("/api/plots/detailed", plotDetailedRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Land Plot API is running successfully");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
