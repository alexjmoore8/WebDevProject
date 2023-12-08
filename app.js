//where you will have the post, get methods
import express, { json, urlencoded } from 'express';
import {userCollection, resumeCollection} from './mongo.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { createResume } from './resumeController.js';

const app = express();
app.use(json());
app.use(urlencoded({ extended:true }));
app.use(cors());

const saltRounds = 15;

app.get("/", cors(), (req, res) => {

})

app.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        const userExists = await userCollection.findOne({ email: email });
        if (userExists) {
            res.json("exists");
        } else {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = { firstName: firstName, lastName: lastName, email: email, password: hashedPassword, role: role};
            await userCollection.insertMany([newUser]);
            res.json("signup_success");
        }
    } catch (e) {
        res.status(500).json("error");
    }
});

app.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userCollection.findOne({ email: email });

        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.json("exists");
            } else {
                res.json("notexist");
            }
        } else {
            res.json("notexist");
        }
    } catch (e) {
        res.status(500).json("error");
    }
});

app.post("/resume-form", async (req, res) => {
    const userId = req.body.userId; 
    const formData = req.body.formData;

    try {
        const savedResume = await createResume(userId, formData);
        res.status(201).json({ message: 'Resume submitted successfully!', resumeId: savedResume._id });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.listen(3000, () => {
    console.log("port listening");
});