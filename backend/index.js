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
app.options('*',cors());
var allowCrossDomain = function(req,res,next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();  
}
app.use(allowCrossDomain);


app.use(uploadRoutes)


app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});