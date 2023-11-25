import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './css/Login.css';
import * as helper from '../../helper/helper.js';


function Signup() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirm] = useState('');    
    const [role, setRole] = useState('');    

   

    async function handleSubmit(e) {
      
        e.preventDefault();

        try {

          if (!firstName || !lastName || !email || !password|| !role ) {
            throw new Error ('All fields must be provided');
          }
  
          helper.validateName(firstName);
          helper.validateName(lastName);
  
          email.toLowerCase();
  
          if (!helper.validatePassword(password)) {
            throw new Error('Password does not meet complexity requirements');
          }

          if (!helper.validateRole(role)) {
            throw new Error('Role must be either "admin" or "user" ');
          }

          role.toLowerCase();

          if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
          }

            const response = await axios.post("http://localhost:3000/signup", {firstName, lastName, email, password, role});
            if (response.data === "exists") {
                alert("User already exists");
            } else if (response.data === "signup_success") {
                alert("Signup successful");
                navigate("/"); // Navigate to login page
            }
        } catch (error) {
            console.error("Signup error", error);
            alert(error);
        }
    }

    return (
    <div className="container">
      <div className="form-box">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
        <input 
            type="firstName" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} 
            placeholder="First Name" 
            required 
          />
            <input 
            type="lastName" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
            placeholder="Last Name" 
            required 
          />
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
          />
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
          />
           <input 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirm(e.target.value)} 
            placeholder="Confirm Password" 
            required 
          />
          <input 
            type="role" 
            value={role}
            onChange={(e) => setRole(e.target.value)} 
            placeholder="Admin or User" 
            required 
          />
          <button type="submit">Create account</button>
        </form>
        <p className="helper-text">
          Already have an account? <Link to="/">Sign in</Link>.
        </p>
      </div>
    </div>
  );

}

export default Signup;
