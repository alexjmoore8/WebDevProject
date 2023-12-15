import { Router } from 'express';
import { addJobPosting, getAllJobs } from './jobPost.js';
const router = Router()

// Handling form submission
router.post('/postJob', async (req, res) => {
  const formData = req.body;
  const { company, title, desc, requirements, city, state, salary } = formData

  try {

    const data = await addJobPosting(
      company,
      title,
      desc,
      requirements,
      city,
      state,
      salary
    )

    return res.json({
      message: 'Saved successfully',
      data
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: error
    })
  }

});


router.get('/getJobPosts', async (req, res) => {

  try {
    const jobs = await getAllJobs()
    res.json(jobs)
  } catch (error) {
    return res.status(500).json({
      message: error
    })
  }

})


export default router