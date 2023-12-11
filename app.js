//where you will have the post, get methods
import express, { json, urlencoded } from 'express';
import collection from './mongo.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import session from 'express-session'; // Import express-session

const app = express();
app.use(json());
app.use(urlencoded({ extended:true }));
app.use(cors({
    origin: 'http://localhost:3001', // or your client origin
    credentials: true
}));
const saltRounds = 15;

app.use(session({
    secret: 'your_secret_key', // Replace 'your_secret_key' with an actual secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to `true` in production with HTTPS
  }));

app.get("/", cors(), (req, res) => {

})

app.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        const userExists = await collection.findOne({ email: email });
        if (userExists) {
            res.json("exists");
        } else {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = { firstName: firstName, lastName: lastName, email: email, password: hashedPassword, role: role};
            await collection.insertMany([newUser]);
            res.json("signup_success");
        }
    } catch (e) {
        res.status(500).json("error");
    }
});

app.post("/", async (req, res) => {
    const { email, password } = req.body;

    console.log("Login attempt for:", email); // Log the email of the login attempt

    try {
        const user = await collection.findOne({ email: email });
        console.log("User found:", user); // Log the retrieved user object (be careful with logging sensitive info)

        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                // Initialize user session with their role
                req.session.user = { id: user._id, role: user.role };
                console.log("Login successful, session initialized:", req.session.user); // Log session info
                res.json({ status: "exists", role: user.role });
            } else {
                console.log("Incorrect password for:", email); // Log incorrect password attempt
                res.json({ status: "notexist", message: "Incorrect password" });
            }
        } else {
            console.log("User not found:", email); // Log if the user is not found
            res.json({ status: "notexist", message: "User not found" });
        }
    } catch (e) {
        console.error("Login error:", e); // Log any server errors
        res.status(500).json({ status: "error", message: "An error occurred" });
    }
});


// Logout endpoint to destroy session
app.get('/logout', (req, res) => {
  if (req.session.user) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out')
      } else {
        res.send('Logout successful')

      }
    });
  } else {
    res.end()
  }
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});