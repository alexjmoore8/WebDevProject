import express from 'express';
const app = express();
const port = 3000; 

// Middleware to parse incoming JSON or form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile( __dirname +'/main.html');
});

// Handling form submission
app.post('/postJob', (req, res) => {
  const formData = req.body; 
  console.log('Received form data:', formData);
  res.send('Form submitted successfully!'); 
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});