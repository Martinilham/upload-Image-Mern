import express from "express";

import {
    gambar,
    updateImage
} from "../controllers/upload-controllers.js"

const router = express.Router();

router.post('/upload-image',gambar);
router.put('/datauser/:id',updateImage);
export default router;