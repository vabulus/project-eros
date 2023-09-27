import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import authRoutes from './routes/authRoutes';
import {PORT} from "./config";
import path from "path";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
