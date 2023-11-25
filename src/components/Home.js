import React from 'react';
import {useLocation, Link} from 'react-router-dom';


function Home(){
    const location=useLocation();


    return (
        <div className="homepage">

            <h1>Hello {location.state.id} and welcome to Resume Builder</h1>

        <p className="helper-text">
           <Link to="/">Logout</Link>
        </p>

        </div>
    )
}

export default Home;