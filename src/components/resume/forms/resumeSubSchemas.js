import mongoose from 'mongoose';

// Shared Schema for Section Heading
const sectionHeadingSchema = { sectionHeading: { type: String, required: false } };

// Sections Schema
export const sectionsSchema = new mongoose.Schema({
    contact: Boolean,
    socials: Boolean,
    about: Boolean,
    education: Boolean,
    courses: Boolean,
    certifications: Boolean,
    skills: Boolean,
    publications: Boolean,
    languages: Boolean,
    projects: Boolean,
    experience: Boolean
});

// Controller Schema
export const controllerSchema = new mongoose.Schema({
    resumeTitle: String,
    layout: String,
    style: String,
    sections: sectionsSchema
});

// Contact Info Schema
export const contactInfoSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    location: {
        city: String,
        state: String,
        country: String
    },
    phone: String,
    pronouns: String
});

// Socials Schema
export const socialsSchema = new mongoose.Schema({
    profiles: [{
    profile:{
        name: String,
        link: String,
        platformType: String
    }
    }]
});

// About Schema
export const aboutSchema = new mongoose.Schema({
    ...sectionHeadingSchema,
    summary: String
});

// Education Schema
export const educationSchema = new mongoose.Schema({
    ...sectionHeadingSchema,
    school: {
        institution: String,
        location: {
            city: String,
            state: String,
            country: String
        },
        degree: String,
        major: String,
        startDate: Date,
        endDate: Date,
        gpa: String
    }
});

// Courses Schema
export const coursesSchema = new mongoose.Schema({
    ...sectionHeadingSchema,
    course: {
        title: String,
        school: String,
        tags: [String]
    }
});

// Certifications Schema
export const certificationsSchema = new mongoose.Schema({
    ...sectionHeadingSchema,
    certification: {
        name: String,
        organization: String,
        date: Date,
        tags: [String]
    }
});

// Publications Schema
export const publicationsSchema = new mongoose.Schema({
    ...sectionHeadingSchema,
    publication: {
        title: String,
        publisher: String,
        date: Date,
        link: String,
        tags: [String]
    }
});

// Languages Schema
export const languagesSchema = new mongoose.Schema({
    ...sectionHeadingSchema,
    languages: [{
        language: String,
        level: String
    }]
});

// Projects Schema
export const projectsSchema = new mongoose.Schema({
    ...sectionHeadingSchema,
    project: {
        title: String,
        description: String,
        link: String,
        tags: [String]
    }
});

// Experience Schema
export const experienceSchema = new mongoose.Schema({
    ...sectionHeadingSchema,
    job: {
        title: String,
        company: String,
        location: {
            city: String,
            state: String,
            country: String
        },
        startDate: Date,
        endDate: Date,
        bullets: [String],
        tags: [String]
    }
});

// Skills Schema
export const skillsSchema = new mongoose.Schema({
    ...sectionHeadingSchema,
    skills: [{
        skill: String,
        level: String
    }]
});
