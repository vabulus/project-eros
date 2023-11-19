import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { PORT } from "./config";
import loveLogRoutes from "./routes/loveLogRoutes";
import authRoutes from "./routes/authRoutes";
import {auth} from "./middleware/auth";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", authRoutes);
app.use("/api", auth, loveLogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
