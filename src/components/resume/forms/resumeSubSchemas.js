import mongoose from 'mongoose';

export const controllerSchema = new mongoose.Schema({
    resumeTitle: {
        type: String,
        required: true,
    },
    layout: {
        type: String,
        required: true,
    },
    style: {
        type: String,
        required: true,
    },
    sections:  sectionsSchema
})

export const sectionsSchema = new mongoose.Schema({

    contact: {
        type: Boolean,
        required: true,
    },
    socials: {
        type: Boolean,
        required: true,
    },
    about: {
        type: Boolean,
        required: true,
    },
    education: {
        type: Boolean,
        required: true,
    },
    courses: {
        type: Boolean,
        required: true,
    },
    certifications: {
        type: Boolean,
        required: true,
    },
    skills: {
        type: Boolean,
        required: true,
    },
    publications: {
        type: Boolean,
        required: true,
    },
    languages: {
        type: Boolean,
        required: true,
    },
    projects: {
        type: Boolean,
        required: true,
    },
    workExperience: {
        type: Boolean,
        required: true,
    },
    volunteerExperience: {
        type: Boolean,
        required: true,
    }
})

export const contactInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true,
    },
    location: {
        city: {
            type: String,
            required:true,
        },
        state: {
            type: String,
            required:true,  
        },
        country: {
            type: String,
        }
    },
    phone: {
        type: String,
        required:true,
    },
    pronouns: {
        type: String,
    },
})

export const socialsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    platformType: {
        type: String,
        required: true,
    }
})

export const aboutSchema = new mongoose.Schema({
    sectionHeading: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    }
})

export const educationSchema = new mongoose.Schema({
    sectionHeading: {
        type: String,
        required: true,
    },
    school: {
        institution: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        degree: {
            type: String,
        },
        major: {
            type: String,
        },
        startDate: {
            type: String,
        },
        endDate: {
            type: String,
        },
        gpa: {
            type: String,
        }
    }
})

export const coursesSchema = new mongoose.Schema({
    sectionHeading: {
        type: String,
        required: true,
    },
    course: {
        title: {
            type: String,
            required: true,
        },
        school: {
            type: String,
            required: true,
        },
        tags:
        {
            type: Array
        }
    }
})

export const certificationsSchema = new mongoose.Schema({
    sectionHeading: {
        type: String,
        required: true,
    },
    certification: {
        name: {
            type: String,
            required: true,
        },
        organization: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        tags:
        {
            type: Array
        }
    }
})

export const publicationsSchema = new mongoose.Schema({
    sectionHeading: {
        type: String,
        required: true,
    },
    publication: {
        title: {
            type: String,
            required: true,
        },
        publisher: {
            type: String,
            required: true,
        },
        date: {
            type: String,
        },
        link: {
            type: String,
        },
        tags:
        {
            type: Array
        }
    
    }
})

export const languagesSchema = new mongoose.Schema({
    sectionHeading: {
        type: String,
        required: true,
    },
    languages: {
        language: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            required: true,
        }
    }
})

export const projectsSchema = new mongoose.Schema({
    sectionHeading: {
        type: String,
        required: true,
    },
    project: {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        link: {
            type: String
        },
        tags:
        {
            type: Array
        }
    }
})

export const workExperienceSchema = new mongoose.Schema({
    sectionHeading: {
        type: String,
        required: true,
    },
    job: {
        title: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        startDate: {
            type: String,
        },
        endDate: {
            type: String,
        },
        bullets: {
            type: Array,
            required: true,
        },
        tags:
        {
            type: Array
        }
    }
})

export const volunteerExperienceSchema = new mongoose.Schema({
    sectionHeading: {
        type: String,
        required: true,
    },
    job: {
        position: {
            type: String,
            required: true,
        },
        organization: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        startDate: {
            type: String,
        },
        endDate: {
            type: String,
        },
        link: {
            type: String,
        },
        bullets: {
            type: Array,
        },
        tags:
        {
            type: Array
        }
    }
})

export const skillsSchema = new mongoose.Schema({
    sectionHeading: {
        type: String,
        required: true,
    },
    skills: {
        skill: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            required: true,
        }
    }
})
