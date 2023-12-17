import React, { useState, useEffect } from 'react';
import { Card, Button } from 'semantic-ui-react';
import { calculateRelevance, extractUniqueTagsFromMultipleResumes } from '../../helper/ComparisonFunctions.js';
import axios from 'axios';

const RankedJobs = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [userResumes, setResumeData] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/jobs');
        setJobPosts(response.data);
      } catch (error) {
        console.error('Error fetching job posts:', error);
      }
    };
    const fetchResumes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/my-resumes');
        setResumeData(response.data);
        console.log('response.data', response.data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };
    fetchJobs();
    fetchResumes();
  }, []);


const calculateJobPostRelevance = (jobPost) => {
  const jobTags = jobPost.tags;
  const userTags = extractUniqueTagsFromMultipleResumes(userResumes);

  const relevance = calculateRelevance(userTags, jobTags);

  return relevance;
};


  // Sort the job posts by relevance
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
