import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./src/routes/users.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
const allowedOrigins = [
  "https://www.projects-page.skylinedev.com.co",
  "http://localhost:3000/"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  }
}));
app.use(express.json());

// Rutas
app.get("/", (req, res) => res.json({ message: "API funcionando ✅" }));
app.use("/api/users", usersRouter);

// Manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});