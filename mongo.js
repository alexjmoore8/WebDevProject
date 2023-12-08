//db setup
import mongoose from 'mongoose';
import * as subSchema from './src/components/resume/resumeForm/resumeSubSchemas.js';

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

const userCollection = mongoose.model("users", userSchema)

const resumeSchema = new mongoose.Schema({
    selections: subSchema.selectionsSchema,
    contact: subSchema.contactInfoSchema,
    socials: subSchema.socialsSchema,
    about: subSchema.aboutSchema,
    education: subSchema.educationSchema,
    courses: subSchema.coursesSchema,
    certifications: subSchema.certificationsSchema,
    publications: subSchema.publicationsSchema,
    languages: subSchema.languagesSchema,
    projects: subSchema.projectsSchema,
    workExperience: subSchema.workExperienceSchema,
    volunteerExperience: subSchema.volunteerExperienceSchema,
    skills: subSchema.skillsSchema,
});

const resumeCollection = mongoose.model("resumes", resumeSchema)

export {userCollection, resumeCollection}