import mongoose from 'mongoose';
import collection from './mongo.js';
import fs from 'fs';

mongoose.connect("mongodb://localhost:27017/react-login")
  .then(() => {
    console.log("mongodb connected successfully for seeding");
    seedDatabase();
  })
  .catch(() => {
    console.log("mongodb connection failed");
  });

const sampleUsers = [
  { firstName: 'John', lastName: 'Doe', email: 'applicant@example.com', password: 'Pass0rd123!', role: 'applicant' },
  { firstName: 'Jane', lastName: 'Doe', email: 'employer@example.com', password: 'Passw0rd123!', role: 'employer' },
  {
    firstName: "John",
    lastName: "Smith",
    email: "john@techinnovators.com",
    password: "EmployerPass1!",
    role: "employer"
  },
  {
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah@awesomestartup.com",
    password: "EmployerPass2!",
    role: "employer"
  },
  {
    firstName: "Michael",
    lastName: "Anderson",
    email: "michael@innovatetech.com",
    password: "EmployerPass3!",
    role: "employer"
  },
  {
    firstName: "Emily",
    lastName: "Wilson",
    email: "emily@digitalcreations.com",
    password: "EmployerPass4!",
    role: "employer"
  },
  {
    firstName: "Daniel",
    lastName: "Brown",
    email: "daniel@ecotechsolutions.com",
    password: "EmployerPass5!",
    role: "employer"
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "applicant1@example.com",
    password: "ApplicantPass1!",
    role: "applicant"
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "applicant2@example.com",
    password: "ApplicantPass2!",
    role: "applicant"
  },
  {
    firstName: "Sherlock",
    lastName: "Holmes",
    email: "sherlock@example.com",
    password: "ApplicantPass3!",
    role: "applicant"
  },
  {
    firstName: "Indiana",
    lastName: "Jones",
    email: "indiana@example.com",
    password: "ApplicantPass4!",
    role: "applicant"
  },
  {
    firstName: "Jordan",
    lastName: "Taylor",
    email: "jordan@example.com",
    password: "ApplicantPass5!",
    role: "applicant"
  }
  // Passwords are not hidden for the seed users. Please make a new user to test full functionality
];

const sampleJobs = [
  {
    companyName: "Tech Innovators",
    title: "Software Engineer",
    description: "Join our dynamic team and work on cutting-edge web applications.",
    city: "Cityville",
    state: "Stateville",
    salary: 80000,
    tags: ["Software Engineering", "Full-time"]
  },
  {
    companyName: "Awesome Startup",
    title: "Frontend Developer",
    description: "Create beautiful and user-friendly interfaces for our web applications.",
    city: "Techville",
    state: "Innovationland",
    salary: 75000,
    tags: ["Web Development", "Full-time"]
  },
  {
    companyName: "Google",
    // employerId: "12345",  // Replace with an actual employer ID
    title: "Software Engineer",
    description: "Developing and maintaining web applications",
    city: "New York",
    state: "NY",
    salary: "80000",
    tags: ["engineering", "full-time"]
  },
  {
    companyName: "Meta",
    // employerId: "67890",  // Replace with an actual employer ID
    title: "Software Engineer",
    description: "Developing and maintaining web applications",
    city: "Mountain View",
    state: "CA",
    salary: "100000",
    tags: ["engineering", "full-time"]
  },
  {
    companyName: "InnovateTech",
    title: "Data Scientist",
    description: "Harness the power of data to drive innovation and insights.",
    city: "Datatown",
    state: "Analytica",
    salary: 90000,
    tags: ["Data Science", "Full-time"]
  },
  {
    companyName: "Digital Creations",
    title: "UI/UX Designer",
    description: "Craft visually appealing and intuitive user interfaces for our digital products.",
    city: "Designville",
    state: "Creativityland",
    salary: 70000,
    tags: ["UI/UX Design", "Full-time"]
  },
  {
    companyName: "EcoTech Solutions",
    title: "Environmental Scientist",
    description: "Contribute to the preservation and sustainability of our environment.",
    city: "Greenville",
    state: "EcoLand",
    salary: 80000,
    tags: ["Environmental Science", "Full-time"]
  },
  {
    companyName: "Tech Innovators",
    title: "Senior Software Engineer",
    description: "Lead our engineering team in developing cutting-edge web applications.",
    city: "Cityville",
    state: "Stateville",
    salary: 100000,
    tags: ["Software Engineering", "Full-time"]
  },
  {
    companyName: "Awesome Startup",
    title: "Backend Developer",
    description: "Build robust server-side components for our web applications.",
    city: "Techville",
    state: "Innovationland",
    salary: 85000,
    tags: ["Web Development", "Full-time"]
  },
  {
    companyName: "InnovateTech",
    title: "Machine Learning Engineer",
    description: "Develop machine learning models to improve our data analysis algorithms.",
    city: "Datatown",
    state: "Analytica",
    salary: 95000,
    tags: ["Data Science", "Full-time"]
  },
  {
    companyName: "Digital Creations",
    title: "UI Designer",
    description: "Design visually stunning user interfaces for our digital products.",
    city: "Designville",
    state: "Creativityland",
    salary: 75000,
    tags: ["UI/UX Design", "Full-time"]
  },
  {
    companyName: "EcoTech Solutions",
    title: "Environmental Analyst",
    description: "Analyze environmental data to support our sustainability initiatives.",
    city: "Greenville",
    state: "EcoLand",
    salary: 85000,
    tags: ["Environmental Science", "Full-time"]
  }
];

async function seedDatabase() {
  try {
    // Clear the existing users
    await collection.collectionUsers.deleteMany({});
    await collection.collectionPosts.deleteMany({});
    await collection.collectionResumes.deleteMany({});

    // Insert the sample data
    await collection.collectionUsers.insertMany(sampleUsers);
    await collection.collectionPosts.insertMany(sampleJobs);
    const resumeData = JSON.parse(fs.readFileSync('resumeSeeds.json', 'utf8'));
    await collection.collectionResumes.insertMany(resumeData);
    console.log('Database seeded!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    mongoose.disconnect();
  }
}
