// import './loginRegister/css/jobList.css';
// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useAuth } from './AuthContext.js';

// export function JobPostList() {
//     const [jobs, setJobs] = useState([]);
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         getJobs();
//     }, []);

//     async function getJobs() {
//         try {
//             const response = await axios.get("/jobs");
//             const sortedJobs = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
//             const jobsWithExpanded = sortedJobs.map(job => ({ ...job, expanded: false }));
//             setJobs(jobsWithExpanded);
//         } catch (error) {
//             setMessage("Error during login");
//         }
//     }

//     const toggleJobExpansion = (jobId) => {
//     if (expandedJobId === jobId) {
//       setExpandedJobId(null);
//     } else {
//       setExpandedJobId(jobId);
//     }
//   };

//   return (
//     <div>
//       <h1>Available Job Listings</h1>
//       <ul>
//         {jobPosts.map((job) => (
//           <li key={job._id}>
//             <div onClick={() => toggleJobExpansion(job._id)}>
//               <strong>{job.title}</strong> - {job.company}
//             </div>
//             {expandedJobId === job._id && (
//               <div>
//                 <p>Description: {job.description}</p>
//                 <p>City: {job.city}</p>
//                 <p>State: {job.state}</p>
//                 <p>Salary: {job.salary}</p>
//                 <p>Tags: {job.tags.join(', ')}</p>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
