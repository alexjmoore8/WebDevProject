import React from "react";


// Applicant side functions
// compare 2 lists of tags and return a value for each matching tag
export function calculateRelevance(tagsA, tagsB) {
  return tagsA.reduce((relevance, tag) => {
    const lowercaseTag = tag.toLowerCase();
    if (tagsB.includes(lowercaseTag)) {
      return relevance + 1;
    }
    return relevance;
  }, 0);
}

// rank the resume items based on their relevance to the job tags
// this helps generate the job specific resume
export function rankItems(items, jobTags) {
  return items
    .map((item) => ({
      ...item,
      relevance: calculateRelevance(item.tags, jobTags),
    }))
    .sort((a, b) => b.relevance - a.relevance);
}

// remove duplicate resume section items
export function removeDuplicateItems(items, key) {
  const uniqueItems = [];
  const encounteredKeys = {};
  items.forEach((item) => {
    const keyValue = item[key].toLowerCase();
    if (!encounteredKeys[keyValue]) {
      encounteredKeys[keyValue] = true;
      uniqueItems.push(item);
    }
  });
  return uniqueItems;
}

// aggregate resume tags, languages, skills for one resume
export function extractUniqueTagsFromResume(resume) {
  const allResumeTags = [];

  Object.keys(resume).forEach((section) => {
    if (resume[section] && resume[section].length > 0) {
      if (Array.isArray(resume[section][0].tags)) {
        const lowercaseTags = resume[section][0].tags.map((tag) => tag.toLowerCase());
        const uniqueTags = Array.from(new Set(lowercaseTags));
        allResumeTags.push(...uniqueTags);
      }
    }
    if (section === 'skills' && resume[section][0].skills) {
      resume[section][0].skills.forEach((skill) => {
        const lowercaseSkill = skill.skill.toLowerCase();
        if (!allResumeTags.includes(lowercaseSkill)) {
          allResumeTags.push(lowercaseSkill);
        }
      });
    }
    if (section === 'languages' && resume[section][0].languages) {
      resume[section][0].languages.forEach((language) => {
        const lowercaseLanguage = language.language.toLowerCase();
        if (!allResumeTags.includes(lowercaseLanguage)) {
          allResumeTags.push(lowercaseLanguage);
        }
      });
    }
  });

  return allResumeTags;
}

// process resume items to remove duplicates and rank by relevance
export function processItems(items, jobTags, key) {
  const rankedItems = rankItems(items, jobTags);
  const uniqueItems = removeDuplicateItems(rankedItems, key);
  return uniqueItems;
}

// aggregate resume tags, languages and skills for multiple resumes
export function extractUniqueTagsFromMultipleResumes(resumes) {
  const allTags = [];
  resumes.forEach((resume) => {
    Object.keys(resume).forEach((section) => {
      if (resume[section] && resume[section].length > 0) {
        if (Array.isArray(resume[section][0].tags)) {
          const lowercaseTags = resume[section][0].tags.map((tag) => tag.toLowerCase());
          lowercaseTags.forEach((tag) => {
            if (!allTags.includes(tag)) {
              allTags.push(tag);
            }
          });
        }
      }
      if (section === 'skills' && resume[section][0].skills) {
        resume[section][0].skills.forEach((skill) => {
          const lowercaseSkill = skill.skill.toLowerCase();
          if (!allTags.includes(lowercaseSkill)) {
            allTags.push(lowercaseSkill);
          }
        });
      }
      if (section === 'languages' && resume[section][0].languages) {
        resume[section][0].languages.forEach((language) => {
          const lowercaseLanguage = language.language.toLowerCase();
          if (!allTags.includes(lowercaseLanguage)) {
            allTags.push(lowercaseLanguage);
          }
        });
      }
    });
  });
  return allTags;
}


// create job list ranked by relevance to all resumes in applicant account
export function rankJobPostsByRelevance(jobPosts, resumes) {
  const rankedJobPosts = jobPosts.map((jobPost) => {
    const resumeTags = extractUniqueTagsFromMultipleResumes(resumes);
    const relevanceScore = calculateResumeToJobRelevance(jobPost.tags, resumeTags);
    return {
      ...jobPost,
      relevanceScore,
    };
  });
  rankedJobPosts.sort((a, b) => b.relevanceScore - a.relevanceScore);
  return rankedJobPosts;
}


// Employer side functions

// calculate relevance between resume and job post
export function calculateResumeToJobRelevance(tags, jobTags) {
  const lowercaseTags = tags.map((tag) => tag.toLowerCase());
  const lowercaseJobTags = jobTags.map((tag) => tag.toLowerCase());
  const calculateResumeToJobRelevance = calculateRelevance(lowercaseTags, lowercaseJobTags);
  return calculateResumeToJobRelevance;
}

// rank resumes based on relevance to job post
export function rankResumesByRelevance(resumes, jobTags) {
  const rankedResumes = resumes.map((resume) => ({
    ...resume,
    relevanceScore: calculateResumeToJobRelevance(resume, jobTags),
  }));
  rankedResumes.sort((a, b) => b.relevanceScore - a.relevanceScore);
  return rankedResumes;
}
