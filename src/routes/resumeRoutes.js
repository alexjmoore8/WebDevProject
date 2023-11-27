// This is probably not needed, but added for testing the resume styles

import { Router } from 'express';
import fs from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
  try {
    const data = await fs.readFile(path.join(__dirname, '../../data/sampleResume.json'), 'utf-8');
    const resumeData = JSON.parse(data);

    // Render the index.html with the provided data
    res.render('layouts/resume1', resumeData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;