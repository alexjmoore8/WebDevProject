//db setup
import mongoose from 'mongoose';
import * as subSchema from './src/components/resume/forms/resumeSubSchemas.js';

mongoose.connect("mongodb://localhost:27017/react-login")
    .then(() => {
        console.log("mongodb connected successfully");
    })
    .catch(() => {
        console.log("mongodb connection failed");
    })

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
})

const resumeSchema = new mongoose.Schema({
    controller: subSchema.controllerSchema,
    contact: subSchema.contactInfoSchema,
    socials: subSchema.socialsSchema,
    about: subSchema.aboutSchema,
    education: subSchema.educationSchema,
    courses: subSchema.coursesSchema,
    certifications: subSchema.certificationsSchema,
    publications: subSchema.publicationsSchema,
    languages: subSchema.languagesSchema,
    projects: subSchema.projectsSchema,
    experience: subSchema.experienceSchema,
    skills: subSchema.skillsSchema,
});

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    requirements: {
        type: Array,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    }

})

const collectionUsers = mongoose.model("users", userSchema)
const collectionResumes = mongoose.model("resumes", resumeSchema)
const collectionPosts = mongoose.model("jobs", jobSchema)

export default { collectionPosts, collectionUsers, collectionResumes }

