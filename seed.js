import mongoose from 'mongoose';
import collection from './mongo.js';


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
  // Add more sample users as needed
  // Passords are not hidden for the seed users. Please make a new user to test full functionality
];

const sampleJobs = [
  {
    companyName: "Google",
    title: "Software Engineer",
    description: "Developing and maintaining web applications",
    requirements: ["JavaScript", "React", "Node.js"],
    city: "New York",
    state: "NY",
    salary: 80000,
    tags: ["engineering", "full-time"]
  },

  {
    companyName: "Meta",
    title: "Software Engineer",
    description: "Developing and maintaining web applications",
    requirements: ["Python", "Tailwind", "Ruby"],
    city: "Mountain View",
    state: "CA",
    salary: 100000,
    tags: ["engineering", "full-time"]
  },
  // Add more sample jobs as needed
];

async function seedDatabase() {
  try {
    // Clear the existing users
    await collection.collectionUsers.deleteMany({});
    await collection.collectionPosts.deleteMany({});


    // Insert the sample data
    await collection.collectionUsers.insertMany(sampleUsers);
    await collection.collectionPosts.insertMany(sampleJobs);

    console.log('Database seeded!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    mongoose.disconnect();
  }
}
