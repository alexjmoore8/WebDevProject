# Resumes

## Forms

The idea for this is that this first section of the form allows the user to determine which sections they would like to include in their resume. These selections will them determine which sections of the form are displayed for the user to fill out.

### TODO

- Connect everything to MongoDB
  - Form should create one large resume object that is connected to it's user
  - Form will have it's own ID, plus a resumeTitle that should be unique to that user's account
- Fix the back button on the form
  - Currently if a section is unchecked, when the user passes the point where that section would be in the form, there is a break in the back button so it cannot return passed that point
- Validation, input checking, and error handling for the whole form
  - This is also where the spelling and grammar check should be implemented
- Add more comprehensive rules for user selections once layouts are complete and the constraints for each section are clear
- Style form with the same/similar styling as the login/signup forms
- Fix dropdown boxes
- Have some way to display examples of style and layout

### Files

- `resume/forms/resumeForm.js`

  - This is what is called by `App.js` for the `/resume/form` route
  - Handles the user the logic for the user selection process, and displaying the appropriate forms based on the user's choices

- `resume/forms/formSections/rf_Selections.js`

  - This is what controls the display of the initial form that allows the user to choose the resume title, layout, and style
  - Probably need to find some way to demo the layouts/styles

- `resume/forms/formSections ...`

  - This holds the rest of the form sections
  - These should be basically finished except for styling and validations

- `resumeSubSchemas.js`
  - This holds all of the schemas for each each section, including a Controller section which holds the info for the resume so that it can be generated (or regenerated later) for the user
    - The main schema is in the ``mongo.js` file and calls these sub-schemas and creates the resumeCollection

## Templates

The idea for this is that each potential section of the resume has it's own file, then based on the user's selections, the layout pulls the correct sections and displays them.

### TODO

- Finish all the layout/section files
- Connect this to mongo
  - When a user wants to see their resume, either when first creating it or on return to the site, their resume object will pass through here to be generated and displayed

### Files

- `./resume/resumeController.js`

  - This is what is called by `App.js` for the `/resume/layout` route
  - Resume layouts are currently being testing using `fakeResume.json` pulled into this file
  - Should probably be what connects to mongo to pull the resume object in to be added to the layout

- `./resume/templates/dynamicResume.js`

  - This determines the layout and passes props to the appropriate layout file

- `./resume/templates/layouts/layout(1,2,3).js`

  - This is what controls the overall structure of the layout
  - Will display different sections based on the users selections (probably using containers)

- `./resume/templates/sections ...`

  - This directory holds all of the files that control the layout of the individual sections

- `./resume/templates/styles ...`

  - This directory holds all of the css files that control the style of the layout
  - Still need to figure out how to pass these into the layout without errors

- `fakeResume.json`
  - Hold fake resume info for testing
  - To change which sections have been chosen to be displayed, change to booleans in the controller object of this file
