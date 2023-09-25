import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { PORT } from "./config";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
