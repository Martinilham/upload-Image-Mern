import uploadRoutes from "./routes/upload-routes.js"
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './database/koneksi.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.send();
});

app.use(uploadRoutes)


app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});