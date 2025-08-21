import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import employeesRoute from "./routes/employees.js";
import trainingsRoute from "./routes/trainings.js";
import certificatesRoute from "./routes/certificates.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();
const __dirname = path.resolve();

app.use("/outputs", express.static(path.join(__dirname, "outputs")));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting MongoDB:", err));

// app.use("/outputs", express.static("outputs"));
app.use("/api/employees", employeesRoute);
app.use("/api/trainings", trainingsRoute);
app.use("/api/certificates", certificatesRoute);
app.listen(5000, () => console.log("Backend running on http://localhost:5000"));