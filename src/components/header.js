import React from 'react';
import { HashRouter as Router,NavLink } from "react-router-dom";


// const navLinkStyle = {
//     borderBottom: "1px solid white"}


export default function header() {
    return (
        <div className="headerWrapper">
            <div className="login">Login</div>
            <Router>
            <ul>
                 <NavLink activeClassName="selected" exact to="/"><li>main page</li><span></span></NavLink>
                 <li className="chartsLinks">charts
                     <ul >
                         <NavLink activeClassName="selected" exact to="/section1"><li>section 1</li><span></span></NavLink>
                         <NavLink activeClassName="selected" to="/section2"> <li>section 2</li><span></span></NavLink>
                         <NavLink activeClassName="selected" to="/section3"> <li>section 3</li><span></span></NavLink>
                         <NavLink activeClassName="selected" to="/section4"> <li>section 4</li><span></span></NavLink>
                     </ul>
                 </li>
                
                 <NavLink activeClassName="selected" to="/contact"> <li>contact</li><span></span></NavLink>                  
            </ul> 

            </Router>
                      
        </div>
    )
}
