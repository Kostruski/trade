import Footer from "./footer.js";
import React from 'react';
import SignUpForm from "./signUpForm.js";
import SignInForm from "./signInForm.js";

  

const LoginPage = props => {
  return (
    <div>
      {props.isNewUser ? <SignUpForm props={props} /> : <SignInForm props={props} /> }
      <Footer />
    </div>
  )
  
};

export default LoginPage
