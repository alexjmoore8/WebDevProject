import React, { useEffect, useState } from 'react';
import { getResumes } from '../api/api';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await getResumes();
        setResumes(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchResumes();
  }, []);

  return (
    <div>
      {resumes.map((resume) => (
        <div key={resume._id}>
          <p>{resume.content}</p>
          {/* You can add buttons or links for editing/deleting here */}
        </div>
      ))}
    </div>
  );
};

export default ResumeList;
