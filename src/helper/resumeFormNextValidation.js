// import { formData, setMessage } from './../components/resume/forms/resumeForm.js';
import { useState } from 'react';

export const validateSelections = (formData, setMessage) => {
  const { resumeTitle, layout, style } = formData.ResumeSelections;
  if (resumeTitle.trim() === '') {
    setMessage('Resume title is required');
    return false;
  }
  else {
    return true;
  }
};

export const validateContactInfo = (formData, setMessage) => {
  const { firstName, lastName, email, location, phone, pronouns } = formData.ResumeContactInfo;
  if (firstName.trim() === '') {
    setMessage('First name is required');
    return false;
  }
  if (lastName.trim() === '') {
    setMessage('Last name is required');
    return false;
  }
  if (email.trim() === '') {
    setMessage('Email is required');
    return false;
  }
  if (location.trim() === '') {
    setMessage('Location is required');
    return false;
  }
  if (phone.trim() === '') {
    setMessage('Phone is required');
    return false;
  }
  else {
    return true;
  }
};

export const validateAbout = (formData, setMessage) => {
  const { summary } = formData.ResumeAbout;
  if (summary.trim() === '') {
    setMessage('Summary is required');
    return false;
  } 
  else {
    return true;
  }
};

export const validateEducation = (formData, setMessage) => {
  const { institution, location, degree, major, startDate, endDate, gpa } = formData.ResumeEducation;
  if (institution.trim() === '') {
    setMessage('Institution is required');
    return false;
  }
  if (location.trim() === '') {
    setMessage('Location is required');
    return false;
  }
  if (degree.trim() === '') {
    setMessage('Degree is required');
    return false;
  }
  if (major.trim() === '') {
    setMessage('Major is required');
    return false;
  }
  else {
    return true;
  }
};

export const validateCourses = (formData, setMessage) => {
  const { title, school } = formData.ResumeCourses;
  if (title.trim() === '') {
    setMessage('Title is required');
    return false;
  }
  if (school.trim() === '') {
    setMessage('School is required');
    return false;
  }
  else {
    return true;
  }
};

export const validateCertifications = (formData, setMessage) => {
  const { name, organization, date } = formData.ResumeCertifications;
  if (name.trim() === '') {
    setMessage('Name is required');
    return false;
  }
  if (organization.trim() === '') {
    setMessage('Organization is required');
    return false;
  }
  // if (date.trim() === '') {
  //   setMessage('Date is required');
  //   return false;
  // }
  else {
    return true;
  }
};

export const validatePublications = (formData, setMessage) => {
  const { title, publisher, date, link } = formData.ResumePublications;
  if (title.trim() === '') {
    setMessage('Title is required');
    return false;
  }
  if (publisher.trim() === '') {
    setMessage('Publisher is required');
    return false;
  }
  if (date.trim() === '') {
    setMessage('Date is required');
    return false;
  }
  if (link.trim() === '') {
    setMessage('Link is required');
    return false;
  }
  else {
    return true;
  }
};

export const validateLanguages = (formData, setMessage) => {
  const { language, level } = formData.ResumeLanguages;
  if (language.trim() === '') {
    setMessage('Language is required');
    return false;
  }
  if (level.trim() === '') {
    setMessage('Level is required');
    return false;
  }
  else {
    return true;
  } 
};

export const validateProjects = (formData, setMessage) => {
  const { title, description, link } = formData.ResumeProjects;
  if (title.trim() === '') {
    setMessage('Title is required');
    return false;
  }
  if (description.trim() === '') {
    setMessage('Description is required');
    return false;
  }
  if (link.trim() === '') {
    setMessage('Link is required');
    return false;
  }
  else {
    return true;
  }
};

export const validateExperience = (formData, setMessage) => {
  const { position, organization, location, startDate, endDate, bullets } = formData.ResumeExperience;
  if (position.trim() === '') {
    setMessage('Position is required');
    return false;
  }
  if (organization.trim() === '') {
    setMessage('Organization is required');
    return false;
  }
  if (location.trim() === '') {
    setMessage('Location is required');
    return false;
  }
  if (startDate.trim() === '') {
    setMessage('Start date is required');
    return false;
  }
  if (endDate.trim() === '') {
    setMessage('End date is required');
    return false;
  }
  if (bullets.trim() === '') {
    setMessage('Bullets are required');
    return false;
  }
  else {
    return true;
  }
};

export const validateSkills = (formData, setMessage) => {
  const { skill, level } = formData.ResumeSkills;
  if (skill.trim() === '') {
    setMessage('Skill is required');
    return false;
  }
  if (level.trim() === '') {
    setMessage('Level is required');
    return false;
  }
  else {
    return true;
  }
};