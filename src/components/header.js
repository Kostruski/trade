import React from 'react';
import { HashRouter as Router,NavLink } from "react-router-dom";

export default function header() {
    return (
        <div className="headerWrapper">
            <span className="login">Login</span>
            <Router>
            <ul>
                 <NavLink exact to="/"><li>main page</li></NavLink>
                 <NavLink to="section1"> <li>section 1</li></NavLink>
                 <NavLink to="section2"> <li>section 2</li></NavLink>
                 <NavLink to="section3"> <li>section 3</li></NavLink>
                 <NavLink to="section4"> <li>section 4</li></NavLink>
                 <NavLink to="contact"> <li>contact</li></NavLink>                  
            </ul> 

            </Router>
                      
        </div>
    )
}
