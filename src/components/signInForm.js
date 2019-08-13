import Footer from "./footer.js";
import { Redirect } from "react-router-dom";
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.common.white,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  textFieldFormLabel: {
    color: theme.palette.common.white,
    },

  cssLabel: {
    color : theme.palette.common.white,   
    },

  cssOutlinedInput : {
     color: theme.palette.common.white,   
   },

  notchedOutline: {
    borderColor: theme.palette.common.white,  
    }

 

}));
  

const SignInPage = (props) => {
 


    const classes = useStyles();
 

  
    if (props.props.isLoggedIn) {
      return <Redirect to="/section1" />;}
    

    return (
      <div className="startPageWarpper">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
               InputLabelProps={{
               classes: {
                 root: classes.cssLabel,
                //  focused: classes.cssFocused,
               },
               }}
               InputProps={{
                 classes: {
                  root: classes.cssOutlinedInput,
                  //  focused: classes.cssFocused,
                   notchedOutline: classes.notchedOutline,
                 }            
               }}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
               InputLabelProps={{
               classes: {
                 root: classes.cssLabel,
                //  focused: classes.cssFocused,
               },
               }}
               InputProps={{
                 classes: {
                  root: classes.cssOutlinedInput,
                  //  focused: classes.cssFocused,
                   notchedOutline: classes.notchedOutline,
                 }            
               }}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" className={classes.cssOutlinedInput} />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={props.props.toggleLogin}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item onClick={props.props.signUp}>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
         
        </Container>

        <Footer />
      </div>
    );
  
}

export default SignInPage
