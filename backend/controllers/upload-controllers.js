import express from "express";
import multer from "multer";
import User from "../models/upload-model.js";
import moment from "momment"
import cloudinary from "cloudinary";

const imgConfig = multer.diskStorage({
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.original}`)
    }
})

const isImage = (req,file,callback)=>{
    if(file.mimetype.startWith("image")){
        callback(null,true)
    }else{
        callback(new Error("Hanya Upload Image Saja"))
    }
}

const upload = multer({
    storage:imgConfig,
    fileFilter:isImage
})

export const gambar = ()=>{
    upload.single("photo"),async(req,res) => {
        const {
            nama,
        } = req.body
    
        const upload = await cloudinary.uploader.upload(req.file.path);
    
        try {

            // const date = moment(new Date()).format("YYYY-MM-DD");
            
            const userBaru = new User({
                nama:nama,
                profilImage:upload.secure_url
            })

            const sendData = await userBaru.save();

            res.status(201).json({status:201,userBaru,message:"Data berhasil disimpan di Database"})

        }catch(error){
            res.status(401).json({status:401,message:"Data gagal dikirim"})
        }
    }
}

export const updateImage = ()=>{
    upload.single("photo"),async(req,res)=>{
        try{

            let update = await User.findById(req.params.id);
            const imgURL =update.profilImage;
            const urlArray = imgURL.spilt("/")
            const image = urlArray[urlArray.length-1];
            const imageNAME = image.Split(".")[0];
            await cloudinary.uploader.destroy(imageNAME);

            let result;
            if(req.file){
                result = await cloudinary.uploader.upload(req.file.path);
            }

            const dataBaru = {
                nama:req.body.nama || update.nama,
                profilImage: result?.secure_url || update.profilImage
            }

            update = await User.findByIdAndUpdate(req.params.id,dataBaru,{new:true})
            res.status(201).json({status:201,userBaru,message:"Data berhasil Di perbarui di Database"})
        }catch(error){
            res.status(500).json({success: false, message: "gagal Memperbarui"})
        }
    }
}