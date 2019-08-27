import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Menu, MenuItem, Card, CardContent } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Box from "@material-ui/core/Box";
import { HashRouter as Router, Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  box: {
    zIndex: 200,
    height: 40,
    alignItems: "center",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },

  accountButton: {
    justifySelf: "end"
  },

  menuButton: {
    marginRight: theme.spacing(3),
    borderRadius: theme.shape.borderRadius
  },
  bar: {
    flexDirection: "row",
    backgroundColor: "#24344D",
    justifyContent: "space-between",
    padding: "10px 30px"
    // [theme.breakpoints.up("md")]: {
    //   justifyContent: "center"
    // }
  },

  menu: {
    "& ul": {
      backgroundColor: "#24344D",
      color: "white"
    }
  },

  menuIcon: {
    display: "flex",
    flexWrap: "nowrap",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const [profileAnchor, setProfileAnchor] = React.useState(null);
  const isProfileOpen = Boolean(profileAnchor);

  const profileClose = () => setProfileAnchor(null);
  const profileOpen = e => setProfileAnchor(e.currentTarget);

  const menuClose = () => setMenuAnchor(null);
  const menuOpen = e => setMenuAnchor(e.currentTarget);
  const isMenuOpen = Boolean(menuAnchor);

  const logOut = () => {
    props.toggleLogin();
    profileClose();
  };

  return (
    <div className={classes.root}>
      <Router>
        <AppBar position="static" className={classes.bar}>
          <IconButton
            edge="start"
            className={classes.menuIcon}
            color="inherit"
            aria-label="menu"
            onClick={menuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Box className={classes.box}>
            <Button
              className={classes.menuButton}
              color="inherit"
              component={Link}
              to={"/section1"}
            >
              Intraday ES/SPY
            </Button>
            <Button
              className={classes.menuButton}
              component={Link}
              to={"/section2"}
              color="inherit"
            >
              SPX/VIX
            </Button>
            <Button
              className={classes.menuButton}
              color="inherit"
              component={Link}
              to={"/section3"}
            >
              Macro/Fx
            </Button>
            <Button
              className={classes.menuButton}
              color="inherit"
              component={Link}
              to={"/section4"}
            >
              Cycles
            </Button>
            <Button
              className={classes.menuButton}
              color="inherit"
              component={Link}
              to={"/contact"}
            >
              Contact
            </Button>
          </Box>
          {props.isLoggedIn ? (
            <IconButton
              className={classes.accountButton}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={profileOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          ) : null}

          <Menu
            id="menu-profile"
            anchorEl={profileAnchor}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={isProfileOpen}
            onClose={profileClose}
          >
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  User Info
                </Typography>
                <Typography variant="body2" component="p">
                 Lorem ipsum dolor sit amet 
                  <br />
                Days premium left: 50
                </Typography>
              </CardContent>
            </Card>
            <MenuItem >Buy premium</MenuItem>
            <MenuItem onClick={logOut}>Log out</MenuItem>
          </Menu>
        </AppBar>

        <Menu
          anchorEl={menuAnchor}
          className={classes.menu}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={menuClose}
        >
          <MenuItem onClick={menuClose} component={Link} to={"/section1"}>
            Section 1
          </MenuItem>
          <MenuItem onClick={menuClose} component={Link} to={"/section2"}>
            Section 2
          </MenuItem>
          <MenuItem onClick={menuClose} component={Link} to={"/section3"}>
            Section 3
          </MenuItem>
          <MenuItem onClick={menuClose} component={Link} to={"/section4"}>
            Section 4
          </MenuItem>
          <MenuItem onClick={menuClose} component={Link} to={"/contact"}>
            Contact
          </MenuItem>
        </Menu>
      </Router>
    </div>
  );
}
