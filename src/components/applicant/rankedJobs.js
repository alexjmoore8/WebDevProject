import React, { useState, useEffect } from 'react';
import { Card, Button } from 'semantic-ui-react';
import { calculateRelevance, extractUniqueTagsFromMultipleResumes } from '../../helper/ComparisonFunctions.js';
import fakeApplicantResumes from './fakeApplicantResumes.json';  

const fetchAllJobPosts = async () => {
  try {
    const response = await fetch('/api/jobPosts');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jobPosts = await response.json();
    return jobPosts;
  } catch (error) {
    console.error('Error fetching job posts:', error);
    throw error;
  }
};

const RankedJobs = () => {
  const [jobPosts, setJobPosts] = useState([]);
const [userResumes, setResumeData] = useState(null);

    useEffect(() => {
        setResumeData(fakeApplicantResumes);

    }, []);

useEffect(() => {
  const fetchJobPosts = async () => {
    try {
      const jobPosts = await fetchAllJobPosts();
      setJobPosts(jobPosts);
    } catch (error) {
        console.error('Error fetching job posts:', error);
        throw error;
    }
  };

  fetchJobPosts();
}, []);

  const calculateJobPostRelevance = (jobPost) => {
    const jobTags = jobPost.tags;
    const userTags = userResumes.flatMap((resume) => extractUniqueTagsFromMultipleResumes(resume));

    const relevance = calculateRelevance(userTags, jobTags);

    return relevance;
  };

  const sortedJobPosts = [...jobPosts].sort((a, b) => {
    const relevanceA = calculateJobPostRelevance(a);
    const relevanceB = calculateJobPostRelevance(b);
    return relevanceB - relevanceA;
  });

  return (
    <div>
      <h1>Ranked Job Posts</h1>
      <Card.Group>
        {sortedJobPosts.map((jobPost) => (
          <Card key={jobPost.id}>
            <Card.Content>
              <Card.Header>{jobPost.title}</Card.Header>
              <Card.Meta>Relevance: {calculateJobPostRelevance(jobPost)}</Card.Meta>
              <Card.Description>
                <Button color="blue">View Details</Button>
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
};

export default RankedJobs;
