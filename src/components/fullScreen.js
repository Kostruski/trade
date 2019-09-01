import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { IconButton } from "@material-ui/core";
import {

  Fullscreen,
  FullscreenExit,

} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { HashRouter as Router, NavLink, Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  menuBut: {
    padding: "6px"
  },

  root: {
    minHeight: "50px",
    justifyContent: "center"
  },

  icon: {
    color: "white",
    fontSize: "35px"
  }
}));

const FullScreen = withRouter(({ history, ...props }) => {
  const classes = useStyles();

  const screenIcon = history.location.pathname.includes("chart") ? (
    <IconButton className={classes.menuBut} onClick={() => history.goBack()}>
      <FullscreenExit className={classes.icon} />
    </IconButton>
  ) : (
    <NavLink to={`/${props.id}`}>
      <IconButton className={classes.menuBut}>
        <Fullscreen className={classes.icon} />
      </IconButton>
    </NavLink>
  );

  return (
    <div className="tools">
      <Toolbar className={classes.root}>
          <Router>{screenIcon}</Router>
      </Toolbar>
    </div>
  );
});

export default FullScreen;
