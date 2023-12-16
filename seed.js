import mongoose from 'mongoose';
import collectionUsers from './mongo.js';

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

async function seedDatabase() {
  try {
    // Clear the existing users
    await collectionUsers.deleteMany({});

    // Insert the sample data
    await collectionUsers.insertMany(sampleUsers);

    console.log('Database seeded!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    mongoose.disconnect();
  }
}
