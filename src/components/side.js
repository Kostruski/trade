import React, { Component } from "react";
import { HashRouter as Router, NavLink } from "react-router-dom";

export default class Side extends Component {
  render() {
    const classText = this.props.mobileSideOn ? `side mobile` : `side`;

    if (this.props.sideVisible)
      return (
        <div className={classText}>
          <h2 onClick={this.props.toggleSide}>&lt;</h2>
          <Router>
            <ul>
              <NavLink activeClassName="selected" exact to="/">
                <li>main page</li>
                <span />
              </NavLink>

              <NavLink activeClassName="selected" exact to="/section1">
                <li>section 1</li>
                <span />
              </NavLink>
              <NavLink activeClassName="selected" to="/section2">
                {" "}
                <li>section 2</li>
                <span />
              </NavLink>
              <NavLink activeClassName="selected" to="/section3">
                {" "}
                <li>section 3</li>
                <span />
              </NavLink>
              <NavLink activeClassName="selected" to="/section4">
                {" "}
                <li>section 4</li>
                <span />
              </NavLink>

              <NavLink activeClassName="selected" to="/contact">
                {" "}
                <li>contact</li>
                <span />
              </NavLink>
            </ul>
          </Router>
        </div>
      );
    else {
      return (
        <div className="side hidden">
          <h2 onClick={this.props.toggleSide}>&gt;</h2>
        </div>
      );
    }
  }
}
