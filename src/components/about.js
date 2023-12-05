import React from 'react';
import Navbar from './Navbar.js';
import "../App.css"
import "./about.css"
const AboutUsPage = () => {
  return (
    <>
    <Navbar/>
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        Welcome to our innovative Resume Builder App! We are a team of passionate developers
        dedicated to helping you create a standout resume effortlessly.
      </p>

      <div className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-member">
          <img src="team-member-1.jpg" alt="Team Member 1" />
          <h3>Alden</h3>
          <p>Developer</p>
        </div>

        <div className="team-member">
          <img src="team-member-2.jpg" alt="Team Member 2" />
          <h3>Alex</h3>
          <p>Developer</p>
        </div>

        <div className="team-member">
          <img src="team-member-3.jpg" alt="Team Member 3" />
          <h3>Zachary </h3>
          <p>Developer</p>
        </div>

        <div className="team-member">
          <img src="team-member-3.jpg" alt="Team Member 3" />
          <h3>JiaHui  </h3>
          <p>Developer</p>
        </div>

        <div className="team-member">
          <img src="team-member-3.jpg" alt="Team Member 3" />
          <h3>Aaliyah </h3>
          <p>Developer</p>
        </div>
      </div>

      

      <p>
        Our mission is to simplify the resume creation process for job seekers. Whether you're
        a recent graduate or a seasoned professional, our app provides intuitive tools and
        templates to craft a resume that showcases your skills and experiences.
      </p>

      <p>
        Thank you for choosing our Resume Builder App. We are excited to be part of your career
        journey and look forward to helping you succeed!
      </p>
    </div>
    </>
  );
};

export default AboutUsPage;
