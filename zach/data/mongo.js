//db setup
import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost:27017/react-login")
.then(()=>{
    console.log("mongodb connected successfully");
})
.catch(()=>{
    console.log("mongodb connection failed");
})

const userSchema=new mongoose.Schema({
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

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required:true,
    },
    title: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required:true,
    },

    requirements: {
        type: Array,
        required:true,
    },
    location: {
        type: String,
        required:true,
    },
    salary: {
        type: Number,
        required:true,
    }
    
})

const collectionUsers = mongoose.model("users", userSchema)
const collectionPosts = mongoose.model("jobs", jobSchema )

export default collectionPosts