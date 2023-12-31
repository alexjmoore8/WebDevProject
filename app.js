//where you will have the post, get methods
import express, { json, urlencoded } from 'express';
import collection from './mongo.js';
import cors from 'cors'
import bcrypt from 'bcrypt';
import session from 'express-session'; // Import express-session
import JobRoutes from './job/jobRoutes.js'
import jobSearchRoutes from './job/jobSearchRoutes.js';
import helmet from 'helmet';
import xss from 'xss-clean';
import bodyParser from 'body-parser';




const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
    }
}));
app.use(xss());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3002', // or your client origin

    credentials: true
}));
const saltRounds = 15;

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to `true` in production with HTTPS
    httpOnly: false // Prevents client side JS from reading the cookie 
}));

app.get("/", (req, res) => {
    // res.render
})

app.get("/verify-auth", (req, res) => {
    if (req.session && req.session.user) {
        res.json({ 
            status: "authenticated", 
            user: {
                id: req.session.user.id,
                role: req.session.user.role
            }
        });
    } else {
        res.status(401).json({ status: "not-authenticated", message: "User is not authenticated" });
    }
});

app.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        const userExists = await collection.collectionUsers.findOne({ email: email });
        console.log(userExists)
        if (userExists) {
            res.json("exists");
        } else {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = { firstName: firstName, lastName: lastName, email: email, password: hashedPassword, role: role };
            await collection.collectionUsers.insertMany([newUser]);
            res.json("signup_success");
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "something happened"
        });
    }
});

app.post("/", async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);

    try {
        const user = await collection.collectionUsers.findOne({ email: email });
        console.log("User found:", user); // Log the retrieved user object (be careful with logging sensitive info)


        if (user) {
            const lockoutTime = 5 * 60 * 1000; // 5 minutes
            if (user.failedAttempts >= 3 && new Date() - user.lastFailedLogin < lockoutTime) {
                console.log("User account locked due to multiple failed attempts:", email);
                return res.status(403).json({ status: "locked", message: "Account locked due to multiple failed login attempts." });
            }

            const match = await bcrypt.compare(password, user.password);
            if (match) {
                // Reset failed attempts on successful login
                await collection.collectionUsers.updateOne({ email: email }, { $set: { failedAttempts: 0, lastFailedLogin: null } });
                req.session.user = { id: user._id, role: user.role };
                console.log("Login successful, session initialized:", req.session.user);
                res.json({ status: "exists", role: user.role });
            } else {
                // Increment failed attempts
                await collection.collectionUsers.updateOne({ email: email }, { $inc: { failedAttempts: 1 }, $set: { lastFailedLogin: new Date() } });
                console.log("Incorrect password for:", email);
                res.json({ status: "notexist", message: "Incorrect password or user" });
            }
        } else {
            console.log("User not found:", email);
            res.json({ status: "notexist", message: "User or password incorrect" });
        }
    } catch (e) {
        console.error("Login error:", e);
        res.status(500).json({ status: "error", message: "An error occurred" });
    }
});

app.post('/jobs', async (req, res) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Unauthorized: No session found' });
    }

    const { companyName, title, description, city, state, salary, tags } = req.body;
    const employerId = req.session.user.id; 
    

    if (!Array.isArray(tags) || tags.some(tag => typeof tag !== 'string' || tag.trim() === '')) {
        return res.status(400).json({ message: 'Invalid tags: must be an array of non-empty strings.' });
    }

    try {
        const newJob = new collection.collectionPosts({ companyName, title, description, city, state, salary, tags, employerId });
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/jobs', async (req, res) => {
    try {
        const jobs = await collection.collectionPosts.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/myJobs', async (req, res) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Unauthorized: No session found' });
    }

    const employerId = req.session.user.id;

    try {
        const myJobs = await collection.collectionPosts.find({ employerId: employerId });
        res.json(myJobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/resume/form", async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized: No session found' });
    }

    const userId = req.session.user.id;

    try {
        const resumeData = { ...req.body, applicantId: userId };

        const newResume = new collection.collectionResumes(resumeData);
        await newResume.save();

        res.status(200).json("Resume submission successful");
    } catch (error) {
        console.error("Error in resume submission:", error);
        res.status(500).json({ message: "Error submitting resume", error: error.message });
    }
});

app.get('/my-resumes', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized: No session found' });
    }
    const userId = req.session.user.id;
    try {
        const userResumes = await collection.collectionResumes.find({ applicantId: userId });

        res.status(200).json(userResumes);
    } catch (error) {
        console.error("Error fetching user's resumes:", error);
        res.status(500).json({ message: "Error retrieving user's resumes", error: error.message });
    }
});


app.get('/resumes', async (req, res) => {
    try {
        // Find all resumes in the database
        const resumes = await collection.collectionResumes.find({});
        // Send the resumes back to the client
        res.status(200).json(resumes);
    } catch (error) {
        // Handle any errors during the fetch operation
        console.error("Error fetching resumes:", error);
        res.status(500).json({ message: "Error retrieving resumes", error: error.message });
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

app.use(JobRoutes);
app.use(jobSearchRoutes);


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});