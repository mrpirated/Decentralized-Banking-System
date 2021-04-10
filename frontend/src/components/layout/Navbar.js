import React from 'react'
import {Link} from 'react-router-dom'
import '../style.css'
 const Navbar = () => {
    return (
        <div>
            <nav>
                
                <ul id = "nav">
                    <li> <a href = "profile.html"> Home</a></li>
                    <li> <a href = "profiles.html"> profiles</a></li>
                    <li> <Link to = "/login">login</Link></li>
                    <li> <Link to = '/register' >register</Link></li>
                    
                </ul>

                    
            </nav>
        </div>
    )
}
export default Navbar
