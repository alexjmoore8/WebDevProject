import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';


function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/signup", { email, password });
            if (response.data === "exists") {
                alert("User already exists");
            } else if (response.data === "signup_success") {
                alert("Signup successful");
                navigate("/"); // Navigate to login page
            }
        } catch (error) {
            console.error("Signup error", error);
            alert("Error during signup");
        }
    }

    return (
    <div className="container">
      <div className="form-box">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Create account</button>
        </form>
        <p className="helper-text">
          Already have an account? <Link to="/login">Sign in</Link>.
        </p>
      </div>
    </div>
  );

}

export default Signup;
