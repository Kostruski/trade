import React from 'react';



// const navLinkStyle = {
//     borderBottom: "1px solid white"}


export default function Header(props) {
    return (
      <div className="headerWrapper">
          <div className="burger" onClick={props.toggleMobileSideOn}>
              <span></span>
              <span></span>
              <span></span>
          </div>
        <div className="login">Login</div>
       
      </div>
    );
}
