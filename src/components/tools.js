import React from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import { IconButton } from "@material-ui/core";
import { NavigateNext, NavigateBefore, ZoomIn, ZoomOut, Fullscreen, FullscreenExit } from "@material-ui/icons";
import { fade, makeStyles } from "@material-ui/core/styles";
import { HashRouter as Router, NavLink, Switch, Route } from "react-router-dom";
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({

  menuBut: {
    marginRight: theme.spacing(2),
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    //  '&:hover': {
    //    backgroundColor: fade(theme.palette.common.white, 0.25)
    // }
    },
  icon: {
   color: "white",
   fontSize: "35px",  

}
 


}))

const Tools = withRouter(({ history, ...props }) => {
  const classes = useStyles();

  const screenIcon = history.location.pathname.includes("chart") ? (
    <IconButton className={classes.menuBut}>
      <FullscreenExit
        onClick={() => history.goBack()}
        className={classes.icon}
      />
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
      <Toolbar>
        <IconButton onClick={props.panLeft} className={classes.menuBut}>
          <NavigateBefore className={classes.icon} />
        </IconButton>
        <IconButton onClick={props.panRight} className={classes.menuBut}>
          <NavigateNext className={classes.icon} />
        </IconButton>
        <IconButton onClick={props.zoomPlus} className={classes.menuBut}>
          <ZoomIn className={classes.icon} />
        </IconButton>
        <IconButton onClick={props.zoomMinus} className={classes.menuBut}>
          <ZoomOut className={classes.icon} />
        </IconButton>
        <Router>{screenIcon}</Router>
      </Toolbar>
    </div>
  );
});

export default Tools;
