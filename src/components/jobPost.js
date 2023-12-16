
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
export function JobPost() {

    const navigate = useNavigate();
    const [company, setCompany] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [salary, setSalary] = useState('');
    const [tags, setTags] = useState('');
    const [message, setMessage] = useState('');


    async function handleSubmit(e) {
        e.preventDefault();

        const payload = {
            company,
            title,
            desc,
            city,
            state,
            salary,
            tags
        }

        try {
            const response = await axios.post("http://localhost:3000/postJob", payload, { withCredentials: true });
            console.log(response.data.status);

            if (response.status == 200) {
                setMessage(response.data.message);
                setTimeout(() => {
                    navigate('/HomeA')
                }, 500);
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error("Login error", error.message);
            // setMessage("Error during login");
        }
    }

    return (
        
        <div className="container">
            <div className="form-box">
                <h1>Post a Job</h1>
        <form onSubmit={handleSubmit}>
        <label for="company">Company:</label>
        <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
            required
        />
        <label for="title">Title:</label>
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
        />
        <br></br>
        <br></br>

        <label for="description">Description:</label><br />
        <textarea
            rows="4" cols="50"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
        /><br /><br />
        <label for="city">City:</label>
        <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            required
        />
        <label for="state">State:</label>
        <select value={state}
            onChange={(e) => setState(e.target.value)} 
            required 
            >
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AZ">AZ</option>
            <option value="AR">AR</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="IA">IA</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="ME">ME</option>
            <option value="MD">MD</option>
            <option value="MA">MA</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MS">MS</option>
            <option value="MO">MO</option>
            <option value="MT">MT</option>
            <option value="NE">NE</option>
            <option value="NV">NV</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NY">NY</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WV">WV</option>
            <option value="WI">WI</option>
            <option value="WY">WY</option>
        </select>
        <br /><br />

        <label for="salary">Salary:</label>
        <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Salary"
            required
            />
        <br /><br />

        <label for="tags">Tags:</label>
        <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags"
            required
        />
        <button type="submit">Submit</button>
    </form>
    {message && <p className={`message error-message`}>{message}</p>}
    <p className="helper-text">
        Want to go back? <Link to="/HomeA">Home</Link>
        </p>
    </div>
</div>
    );
}

export default JobPost;