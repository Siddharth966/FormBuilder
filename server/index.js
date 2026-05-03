// index.js
import express from "express";
import connectDB from "./db.js";
import formRoutes from "./routes/form.route.js";
import submissionRoutes from "./routes/subimission.js";
import dashboardRoutes from "./routes/dashboard.js";
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
app.use("/api/dashboard", dashboardRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${baseUrl}`);
});
