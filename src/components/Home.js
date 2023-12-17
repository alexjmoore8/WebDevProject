import { useLocation  } from 'react-router-dom';
import Navbar from './Navbar.js';

function Home(){
    const location=useLocation();


    return (
        <div className="homepage">
            <Navbar /> {/* Include the Navbar component */}

            <h1>Hello {location.state?.id} and welcome to Resume E Builder</h1>

        
        </div>
    )
}


export default Home;
