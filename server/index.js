// index.js
import express from "express";
import connectDB from "./db.js";
import formRoutes from "./routes/form.route.js";
import submissionRoutes from "./routes/subimission.js";
import cors from "cors";
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

connectDB();

// Routes
app.use("/api/forms", formRoutes);
app.use("/api/responses", submissionRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
