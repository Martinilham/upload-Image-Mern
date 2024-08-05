import mongoose from "mongoose";

const User = mongoose.Schema({
    nama:{
        type:String,
        required:true
    },
    profilImage:{
        type:String,
        required:true
    }
})

export default mongoose.model("User",User);