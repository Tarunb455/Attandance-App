import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import db from "./src/config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
