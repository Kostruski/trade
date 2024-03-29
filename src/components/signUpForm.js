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
    marginTop: theme.spacing(3),
  
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
    "&:hover" : {
         color: "red!important"
     }
  
    },
  


}));

export default function SignUpForm(props) {
  const classes = useStyles();

  return (
    <div className="startPageWarpper">
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
                 notchedOutline: classes.notchedOutline,
                }            
              }}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
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
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
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
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" className={classes.cssOutlinedInput} />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={props.props.changeNewUser}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item onClick={props.props.changeNewUser}>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
  </Container>
  </div>
  );
}
