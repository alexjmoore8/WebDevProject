// import React, { useState } from 'react';
// import { createResume } from '../api/api';

// const ResumeForm = ({ userId }) => {
//   const [content, setContent] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const newResume = { userId, content };
//       await createResume(newResume);
//       // Handle success, maybe clear form or show a success message
//     } catch (error) {
//       // Handle error, such as displaying a message to the user
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Resume content" />
//       <button type="submit">Save Resume</button>
//     </form>
//   );
// };

// export default ResumeForm;
