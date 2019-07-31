import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Menu, MenuItem } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";
import {  HashRouter as Router, Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  box: {
    zIndex: 200,
    alignItems: "center",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  menuButton: {
    marginRight: theme.spacing(5),
    borderRadius: theme.shape.borderRadius
  },
  bar: {
    flexDirection: "row",
    backgroundColor: "#24344D",
    justifyContent: "flex-start",
    padding: "10px 30px",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "center"
    }
  },

  menu: {
    "& ul": {
      backgroundColor: "#24344D",
      color: "white",
      
    }
  },

  menuIcon: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header() {
  const classes = useStyles();
  const [menuAnchor, setMenuAnchor] = React.useState(null);

  const menuClose = () => setMenuAnchor(null);
  const menuOpen = e => setMenuAnchor(e.currentTarget);
  const isMenuOpen = Boolean(menuAnchor);

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
          <Button className={classes.menuButton} color="inherit" component={Link} to={"/section1"}>
            Section 1
          </Button>
          <Button className={classes.menuButton} component={Link} to={"/section2"} color="inherit">
            Section 2
          </Button>
          <Button className={classes.menuButton} color="inherit" component={Link} to={"/section3"}>
            Section 3
          </Button>
          <Button className={classes.menuButton} color="inherit" component={Link} to={"/section4"}>
            Section 4
          </Button>
        </Box>
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
        <MenuItem onClick={menuClose} component={Link} to={"/section1"}>Section 1</MenuItem>
        <MenuItem onClick={menuClose} component={Link} to={"/section2"}>Section 2</MenuItem>
        <MenuItem onClick={menuClose} component={Link} to={"/section3"}>Section 3</MenuItem>
        <MenuItem onClick={menuClose} component={Link} to={"/section4"}>Section 4</MenuItem>
      </Menu>
      </Router>
    </div>
  );
}
