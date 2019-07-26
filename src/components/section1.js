
import Chart from "./charts/chart.js";
import React, { Component } from "react";
import { HashRouter as Router, NavLink, Switch, Route } from "react-router-dom";

export default class Section1 extends Component {
  render() {
    return (
      <div className="sectionWrapper">
        <Router>
          <NavLink to={`/${this.props.data.data1.id}`}>
            <Chart data={this.props.data.data1}  />
          </NavLink>
          <NavLink to={`/${this.props.data.data1.id}`}>
            <Chart data={this.props.data.data1} />
          </NavLink>
          <NavLink to={`/${this.props.data.data1.id}`}>
            <Chart data={this.props.data.data1} />
          </NavLink>
          <NavLink to={`/${this.props.data.data1.id}`}>
            <Chart data={this.props.data.data1} />
          </NavLink>
          <NavLink to={`/${this.props.data.data1.id}`}>
            <Chart data={this.props.data.data1} />
          </NavLink>
          <NavLink to={`/${this.props.data.data1.id}`}>
            <Chart data={this.props.data.data1} />
          </NavLink>  
                        
        </Router>
      </div>
    );
  }
}
