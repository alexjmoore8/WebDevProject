// This is probably not what is needed in this file needed, but added for testing the resume styles

import express from 'express';
const app = express();
import configRoutes from './src/routes/indexRoutes.js';
import path from 'path';
import fs from 'fs/promises';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import exphbs from 'express-handlebars';
import handlebars from 'handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const handlebarsInstance = exphbs.create({
  defaultLayout: 'resume1',
  extname: '.handlebars',
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number')
        return new handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new handlebars.SafeString(JSON.stringify(obj));
    }
  }
});

// Set path for partials
const partialsPath = path.join(__dirname, 'views/resumes/sections');
const partialsToRegister = ['about', 'certifications', 'contact', 'courses', 'education', 'languages', 'projects', 'publications', 'skills', 'socials',  'volunteer_experience', 'work_experience'];

partialsToRegister.forEach(async (partialName) => {
    handlebarsInstance.handlebars.registerPartial(
      partialName,
      await fs.readFile(path.join(partialsPath, `${partialName}.handlebars`), 'utf-8')
    );
});

// Set the path for static files (CSS, JS)
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/data', express.static(path.join(__dirname, 'data')));


// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views/resumes'));

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
