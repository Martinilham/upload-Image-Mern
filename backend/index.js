import uploadRoutes from "./routes/upload-routes.js"
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './database/koneksi.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use(express.json());
app.use(uploadRoutes)


app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});