//db setup
import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost:27017/react-login")
.then(()=>{
    console.log("mongodb connected successfully");
})
.catch(()=>{
    console.log("mongodb connection failed");
})

const newSchema=new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
    },
    lastName: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
    },

    password: {
        type: String,
        required:true,
    },
    role: {
        type: String,
        required:true,
    }
    
})

const collectionUsers = mongoose.model("users", newSchema)

export default collection