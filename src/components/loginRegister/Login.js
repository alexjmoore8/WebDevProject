import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './css/Login.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/", {email, password });
            if (response.data === "exists") {
                navigate("/home", { state: { id: email } }); // Navigate to home page
            } else if (response.data === "notexist") {
                setMessage("User not found or password incorrect");
            }
        } catch (error) {
            console.error("Login error", error.message);
            setMessage("Error during login");
        }
    }

    return (
    <div className="container">
      <div className="form-box">
        <h1>Login</h1>
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
          <button type="submit">Sign in</button>
        </form>
        {message && <p className={`message error-message`}>{message}</p>}
        <p className="helper-text">
          New to our service? <Link to="/signup">Create an account</Link>.
        </p>
      </div>
    </div>
  );
}

export default Login;
