import express from "express";
import multer from "multer"
import User from "../models/upload-model.js"
import cloudinary from '../cloudinary.js'

import {
    gambar,
    updateImage
} from "../controllers/upload-controllers.js"

const router = express.Router();

const imgconfig = multer.diskStorage({
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
});

const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("only images is allow"))
    }
}

const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})


router.post("/register",upload.single("photo"),async(req,res)=>{
    

    const {nama} = req.body;

    
    const upload = await cloudinary.uploader.upload(req.file.path);
    

    try {


        const userBaru = new User({
            nama: nama,
            profilImage: upload.secure_url,
        });

        const sendData = await userBaru.save();

        res.status(201).json({status:201,sendData});

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});


export default router;