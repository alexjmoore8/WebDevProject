import { Router } from 'express';
import { addJobPosting, getAllJobs, getMyJobs } from './jobPost.js';
const router = Router()

// Handling form submission
router.post('/postJob', async (req, res) => {
  const formData = req.body;
  const { company, title, desc, city, state, salary, tags } = formData

  try {

    const data = await addJobPosting(
      company,
      title,
      desc,
      city,
      state,
      salary,
      tags,
      req.session.user.id
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


router.get('/myJobs', async (req, res) => {

  console.log(req.session)

  try {
    const jobs = await getMyJobs(
      req.session.user.id
    )
    res.json(jobs)
  } catch (error) {
    return res.status(500).json({
      message: error
    })
  }

})


export default router