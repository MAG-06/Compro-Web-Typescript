import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import comprobanteRoutes from "./routes/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", comprobanteRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});