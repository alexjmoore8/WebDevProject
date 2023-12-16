import { Router } from 'express';
import { searchJobs } from './jobSearchHelper.js'; // Import the helper function
const router = Router();

router.post('/searchJobs', async (req, res) => {
    try {
        const searchCriteria = req.body;
        const jobs = await searchJobs(searchCriteria);
        res.json(jobs);
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ message: "Error occurred during job search" });
    }
});

export default router;
